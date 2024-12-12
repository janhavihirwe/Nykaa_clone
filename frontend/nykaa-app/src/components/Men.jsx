import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FaHeart, FaStar } from 'react-icons/fa';
import './Men.css'; // Import the CSS file

function Men() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [filters, setFilters] = useState({
    brand: [],
    rating: '',
    fit: '',
    category: '',
  });

  useEffect(() => {
    fetch('https://bewakoof-clone-1.onrender.com/product/category/men')
      .then(response => response.json())
      .then(data => {
        setProducts(data.product);
        setFilteredProducts(data.product);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
        setError('Failed to fetch products');
      });
  }, []);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedProducts = [...filteredProducts];
    switch (selectedOption) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.discounted_price - b.discounted_price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.discounted_price - a.discounted_price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);

    let updatedFilteredProducts = products;

    if (updatedFilters.brand.length) {
      updatedFilteredProducts = updatedFilteredProducts.filter(product =>
        updatedFilters.brand.includes(product.brand)
      );
    }

    if (updatedFilters.rating) {
      updatedFilteredProducts = updatedFilteredProducts.filter(product =>
        product.rating >= updatedFilters.rating
      );
    }

    if (updatedFilters.fit) {
      updatedFilteredProducts = updatedFilteredProducts.filter(product =>
        product.fit === updatedFilters.fit
      );
    }

    if (updatedFilters.category) {
      updatedFilteredProducts = updatedFilteredProducts.filter(product =>
        product.category === updatedFilters.category
      );
    }

    if (updatedFilters.size) {
      updatedFilteredProducts = updatedFilteredProducts.filter(product =>
        product.sizes.includes(updatedFilters.size)
      );
    }

    setFilteredProducts(updatedFilteredProducts);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const uniqueFits = [...new Set(products.map(product => product.fit))];
  const uniqueSizes = [...new Set(products.flatMap(product => product.sizes))];

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="content">
          {/* Filters on the left */}
          <div className="filters">
            <h2>Clothes for Men: {filteredProducts.length}</h2>
            <div className="divider"></div>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>

            <select onChange={(e) => handleFilterChange('brand', [e.target.value])}>
              <option value="">Brand</option>
              {uniqueBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleFilterChange('rating', e.target.value)}>
              <option value="">Rating</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="2">2 Stars & Up</option>
              <option value="1">1 Star & Up</option>
            </select>

            <select onChange={(e) => handleFilterChange('fit', e.target.value)}>
              <option value="">Fit</option>
              {uniqueFits.map((fit, index) => (
                <option key={index} value={fit}>
                  {fit}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleFilterChange('size', e.target.value)}>
              <option value="">Size</option>
              {uniqueSizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Products on the right */}
          <div className="products">
            <div className="product-grid">
              {currentProducts.map(product => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={product.imgURL} alt={product.title} />
                    <div className="rating">
                      <FaStar color="goldenrod" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="product-details">
                    <p className="brand">{product.brand}</p>
                    <h3 className="title">{product.title}</h3>
                    <div className="price">
                      <span className="discounted-price">Rs. {product.discounted_price}</span>
                      <span className="original-price">Rs. {product.price}</span>
                      <span className="discount">{product.fit}</span>
                    </div>
                    <button className="wishlist-button">
                      <FaHeart /> Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={currentPage === page + 1 ? 'active' : ''}
                >
                  {page + 1}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Men;
