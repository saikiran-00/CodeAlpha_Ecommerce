import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const activeCategory = searchParams.get('category') || 'All';
  const activeSearch = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (activeSearch) params.search = activeSearch;
        if (activeCategory && activeCategory !== 'All') params.category = activeCategory;
        const { data } = await getProducts(params);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeSearch, activeCategory]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Products</h1>
          <p>Explore our curated collection of premium products</p>
        </div>

        {/* Search Bar */}
        <form className="products-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button type="button" className="search-clear" onClick={clearSearch}>✕</button>
          )}
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat || (cat === 'All' && !activeCategory) ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Filters Display */}
        {(activeSearch || (activeCategory && activeCategory !== 'All')) && (
          <div className="active-filters">
            {activeSearch && (
              <span className="filter-tag">
                Search: &quot;{activeSearch}&quot;
                <button onClick={clearSearch}>✕</button>
              </span>
            )}
            {activeCategory && activeCategory !== 'All' && (
              <span className="filter-tag">
                Category: {activeCategory}
                <button onClick={() => handleCategoryChange('All')}>✕</button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <span className="no-products-icon">🔍</span>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <p className="results-count">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
