# 🛍️ Shopora — Premium E-Commerce Store

<div align="center">

**A full-stack e-commerce web application built with React, Node.js, Express, and MongoDB**

[![Made with React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

*CodeAlpha Full-Stack Development Internship — Task 1*

</div>

---

## 📋 Overview

**Shopora** is a modern, full-featured e-commerce web application that provides a seamless online shopping experience. Built as part of the CodeAlpha Full-Stack Development Internship, this project demonstrates proficiency in modern web technologies including React.js, Node.js, Express.js, and MongoDB.

The application features user authentication, product browsing with search and filtering, a fully functional shopping cart, checkout with order management, and a responsive design that works beautifully on all devices.

---

## ✨ Features

### 🏠 Homepage
- Attractive hero banner with call-to-action
- Featured products section
- Category showcase
- Newsletter signup section

### 🛒 Product Management
- Product listing with grid layout
- Search products by name
- Filter by category (Electronics, Fashion, Accessories, Home)
- Detailed product pages with images, descriptions, and ratings
- Stock availability tracking

### 👤 User Authentication
- Secure registration with input validation
- JWT-based login/logout
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Persistent sessions

### 🛍️ Shopping Cart
- Add/remove products
- Quantity adjustment with stock limits
- Persistent cart (localStorage)
- Real-time subtotal and total calculation
- Cart badge with item count

### 📦 Checkout & Orders
- Secure checkout flow (login required)
- Delivery information form with validation
- Order summary with itemized details
- Cash on Delivery payment method
- Server-side price calculation (tamper-proof)
- Stock deduction on successful order
- Order confirmation page
- Order history (My Orders)

### 📱 Responsive Design
- Desktop, tablet, and mobile layouts
- Modern UI with smooth animations
- Glass-morphism navigation bar
- Professional typography (Inter font)

---

## 🛠️ Technology Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| **Frontend**   | React 18, React Router v6, Vite   |
| **Styling**    | CSS3 (Custom Properties, Grid, Flexbox) |
| **Backend**    | Node.js, Express.js               |
| **Database**   | MongoDB Atlas, Mongoose            |
| **Auth**       | JWT, bcryptjs                      |
| **HTTP Client**| Axios                              |
| **Dev Tools**  | Nodemon, Vite HMR                  |

---

## 📸 Screenshots

> Add screenshots of your running application here before submitting.

| Page | Preview |
|------|---------|
| Homepage | *screenshot* |
| Products | *screenshot* |
| Product Detail | *screenshot* |
| Shopping Cart | *screenshot* |
| Checkout | *screenshot* |
| My Orders | *screenshot* |
| Login | *screenshot* |
| Register | *screenshot* |

---

## 📁 Project Structure

```
shopora/
├── frontend/                   # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx/css  # Navigation bar
│   │   │   ├── ProductCard.jsx/css  # Product card
│   │   │   └── Footer.jsx/css  # Footer
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.jsx # Authentication state
│   │   │   └── CartContext.jsx # Cart state
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx/css
│   │   │   ├── ProductsPage.jsx/css
│   │   │   ├── ProductDetailPage.jsx/css
│   │   │   ├── CartPage.jsx/css
│   │   │   ├── LoginPage.jsx/css
│   │   │   ├── RegisterPage.jsx/css
│   │   │   ├── CheckoutPage.jsx/css
│   │   │   ├── OrdersPage.jsx/css
│   │   │   └── OrderSuccessPage.jsx/css
│   │   ├── services/
│   │   │   └── api.js          # Axios API client
│   │   ├── App.jsx             # Root component + routes
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── backend/                    # Express.js backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── productController.js# Product logic
│   │   └── orderController.js  # Order logic
│   ├── middleware/
│   │   ├── auth.js             # JWT auth middleware
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Product.js          # Product schema
│   │   └── Order.js            # Order schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth routes
│   │   ├── productRoutes.js    # Product routes
│   │   └── orderRoutes.js      # Order routes
│   ├── server.js               # Express server entry
│   ├── seed.js                 # Database seeder
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CodeAlpha_EcommerceStore.git
cd CodeAlpha_EcommerceStore
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shopora?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_URL=http://localhost:5173
```

> **📌 MongoDB Atlas Setup:**
> 1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
> 2. Create a new cluster (free M0 tier)
> 3. Create a database user with username and password
> 4. Add your IP address to the Network Access whitelist (or allow access from anywhere: `0.0.0.0/0`)
> 5. Click "Connect" → "Connect your application" → Copy the connection string
> 6. Replace `<username>`, `<password>`, and the cluster URL in your `.env` file

### 3. Seed the Database

```bash
npm run seed
```

This populates the database with 10 sample products so the store works immediately.

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Variable      | Description                        | Example                                |
|---------------|------------------------------------|----------------------------------------|
| `PORT`        | Server port                        | `5000`                                 |
| `MONGO_URI`   | MongoDB Atlas connection string    | `mongodb+srv://user:pass@cluster...`   |
| `JWT_SECRET`  | Secret key for JWT tokens          | `my_super_secret_key_123`              |
| `CLIENT_URL`  | Frontend URL (for CORS)            | `http://localhost:5173`                |

### Frontend (`frontend/.env`)

| Variable       | Description         | Example                          |
|----------------|---------------------|----------------------------------|
| `VITE_API_URL` | Backend API base URL| `http://localhost:5000/api`      |

---

## 📡 API Endpoints

### Health Check
| Method | Endpoint       | Description         |
|--------|---------------|----------------------|
| GET    | `/api/health` | Server health check  |

### Authentication
| Method | Endpoint             | Description              | Auth |
|--------|---------------------|--------------------------|------|
| POST   | `/api/auth/register` | Register a new user      | ❌   |
| POST   | `/api/auth/login`    | Login with credentials   | ❌   |
| GET    | `/api/auth/me`       | Get current user profile | ✅   |

### Products
| Method | Endpoint              | Description                    | Auth |
|--------|-----------------------|--------------------------------|------|
| GET    | `/api/products`       | Get all products (with search/filter) | ❌ |
| GET    | `/api/products/:id`   | Get single product by ID       | ❌   |

**Query Parameters for GET `/api/products`:**
- `search` — Search by product name (case-insensitive)
- `category` — Filter by category (Electronics, Fashion, Accessories, Home)

### Orders
| Method | Endpoint                | Description              | Auth |
|--------|------------------------|--------------------------|------|
| POST   | `/api/orders`          | Create a new order       | ✅   |
| GET    | `/api/orders/my-orders`| Get logged-in user's orders | ✅ |

---

## 🗄️ Database Models

### User
```javascript
{
  name: String,       // Required
  email: String,      // Required, unique
  password: String,   // Required, hashed with bcryptjs
  timestamps: true
}
```

### Product
```javascript
{
  name: String,        // Required
  description: String, // Required
  price: Number,       // Required
  image: String,       // URL
  category: String,    // Electronics | Fashion | Accessories | Home
  stock: Number,       // Available quantity
  rating: Number,      // 0-5
  numReviews: Number,
  timestamps: true
}
```

### Order
```javascript
{
  user: ObjectId,          // Reference to User
  items: [{
    product: ObjectId,     // Reference to Product
    name: String,
    quantity: Number,
    price: Number,
    image: String
  }],
  deliveryInfo: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  totalAmount: Number,
  paymentMethod: String,   // "Cash on Delivery"
  status: String,          // Processing | Confirmed | Shipped | Delivered | Cancelled
  timestamps: true
}
```

---

## 🔮 Future Improvements

- [ ] Admin dashboard for product and order management
- [ ] Product reviews and ratings by users
- [ ] Wishlist functionality
- [ ] Email notifications for order updates
- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] Product image upload support
- [ ] Pagination for product listings
- [ ] Password reset functionality
- [ ] Order tracking with status updates
- [ ] Social login (Google, GitHub)
- [ ] Product sorting (price, rating, newest)
- [ ] Dark mode toggle

---

## 🤝 Contributing

This project was built for the CodeAlpha Full-Stack Development Internship. Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---

## 👨‍💻 Author

**Your Name**
- CodeAlpha Intern — Full-Stack Development
- GitHub: [@your-username](https://github.com/your-username)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for CodeAlpha

</div>
