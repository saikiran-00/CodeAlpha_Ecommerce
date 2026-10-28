const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { items, deliveryInfo, paymentMethod } = req.body;

    // Validate deliveryInfo
    if (
      !deliveryInfo ||
      !deliveryInfo.fullName ||
      !deliveryInfo.phone ||
      !deliveryInfo.address ||
      !deliveryInfo.city ||
      !deliveryInfo.state ||
      !deliveryInfo.zipCode
    ) {
      return res.status(400).json({
        message: 'Please provide all delivery fields: fullName, phone, address, city, state, zipCode',
      });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Prepare and verify items and stock
    const preparedItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const productId = item.product || item._id;
      if (!productId) {
        return res.status(400).json({ message: 'Each item must have a valid product id' });
      }

      const requestedQty = Number(item.quantity);
      if (!requestedQty || requestedQty < 1) {
        return res.status(400).json({ message: 'Item quantity must be at least 1' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      if (product.stock < requestedQty) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${requestedQty}`,
        });
      }

      const itemTotal = Number((product.price * requestedQty).toFixed(2));
      calculatedTotal += itemTotal;

      preparedItems.push({
        product: product._id,
        name: product.name,
        quantity: requestedQty,
        price: product.price,
        image: product.image || item.image || '',
      });
    }

    calculatedTotal = Number(calculatedTotal.toFixed(2));

    let createdOrder = null;
    let session = null;
    let useTransaction = true;

    try {
      session = await mongoose.startSession();
      session.startTransaction();
    } catch (sessionErr) {
      useTransaction = false;
      if (session) {
        try {
          await session.endSession();
        } catch (_) {}
        session = null;
      }
    }

    if (useTransaction && session) {
      try {
        for (const item of preparedItems) {
          const updated = await Product.findOneAndUpdate(
            { _id: item.product, stock: { $gte: item.quantity } },
            { $inc: { stock: -item.quantity } },
            { session, new: true }
          );

          if (!updated) {
            throw new Error(`Insufficient stock for product id ${item.product}`);
          }
        }

        const order = new Order({
          user: req.user._id,
          items: preparedItems,
          deliveryInfo: {
            fullName: deliveryInfo.fullName.trim(),
            phone: deliveryInfo.phone.trim(),
            address: deliveryInfo.address.trim(),
            city: deliveryInfo.city.trim(),
            state: deliveryInfo.state.trim(),
            zipCode: deliveryInfo.zipCode.trim(),
          },
          totalAmount: calculatedTotal,
          paymentMethod: paymentMethod || 'Cash on Delivery',
          status: 'Processing',
        });

        await order.save({ session });
        await session.commitTransaction();
        createdOrder = order;
      } catch (txnErr) {
        await session.abortTransaction();
        if (
          txnErr.message &&
          (txnErr.message.includes('replica set') ||
            txnErr.message.includes('standalone') ||
            txnErr.message.includes('Transaction numbers are only allowed'))
        ) {
          useTransaction = false;
        } else {
          throw txnErr;
        }
      } finally {
        await session.endSession();
      }
    }

    // Fallback: standalone MongoDB without replica set transaction support
    if (!createdOrder && !useTransaction) {
      const modifiedProducts = [];
      try {
        for (const item of preparedItems) {
          const updated = await Product.findOneAndUpdate(
            { _id: item.product, stock: { $gte: item.quantity } },
            { $inc: { stock: -item.quantity } },
            { new: true }
          );

          if (!updated) {
            throw new Error(`Insufficient stock for product ${item.name}`);
          }

          modifiedProducts.push({
            productId: item.product,
            quantity: item.quantity,
          });
        }

        createdOrder = await Order.create({
          user: req.user._id,
          items: preparedItems,
          deliveryInfo: {
            fullName: deliveryInfo.fullName.trim(),
            phone: deliveryInfo.phone.trim(),
            address: deliveryInfo.address.trim(),
            city: deliveryInfo.city.trim(),
            state: deliveryInfo.state.trim(),
            zipCode: deliveryInfo.zipCode.trim(),
          },
          totalAmount: calculatedTotal,
          paymentMethod: paymentMethod || 'Cash on Delivery',
          status: 'Processing',
        });
      } catch (rollbackErr) {
        // Rollback deducted stock
        for (const mod of modifiedProducts) {
          try {
            await Product.findByIdAndUpdate(mod.productId, {
              $inc: { stock: mod.quantity },
            });
          } catch (restoreErr) {
            console.error(`Error restoring stock for product ${mod.productId}:`, restoreErr);
          }
        }
        throw rollbackErr;
      }
    }

    return res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
