import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, clearCurrentProduct } from '../store/productSlice';

// Import images statically so webpack compiles them correctly
import laptop1 from '../assets/laptop1.png';
import laptop2 from '../assets/laptop2.jpg';
import laptop3 from '../assets/laptop3.png';
import laptop4 from '../assets/laptop4.png';
import laptop5 from '../assets/laptop5.jpg';
import laptop6 from '../assets/laptop6.png';
import laptop7 from '../assets/laptop7.jpg';
import laptop8 from '../assets/laptop8.jpg';
import laptop9 from '../assets/laptop9.png';
import laptop10 from '../assets/laptop10.png';

const imageMap = {
  'laptop1.png': laptop1,
  'laptop2.jpg': laptop2,
  'laptop3.png': laptop3,
  'laptop4.png': laptop4,
  'laptop5.jpg': laptop5,
  'laptop6.png': laptop6,
  'laptop7.jpg': laptop7,
  'laptop8.jpg': laptop8,
  'laptop9.png': laptop9,
  'laptop10.png': laptop10,
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  if (loading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="product-detail-container error-container">
        <div className="error-banner">Error: {error}</div>
        <button className="btn-back-home" onClick={() => navigate('/')}>
          Back Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container error-container">
        <div className="error-banner">Product not found.</div>
        <button className="btn-back-home" onClick={() => navigate('/')}>
          Back Home
        </button>
      </div>
    );
  }

  // Calculate discount percentage dynamically
  let discountPercent = 0;
  if (product.price && product.currentPrice) {
    const orig = parseFloat(product.price.replace(/\D/g, ''));
    const curr = parseFloat(product.currentPrice.replace(/\D/g, ''));
    if (orig > 0) {
      discountPercent = Math.round(((orig - curr) / orig) * 100);
    }
  }

  // Resolve image source using imageMap or default to laptop1
  const imageSrc = imageMap[product.image] || laptop1;

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">{product.name}</h2>

      <div className="product-detail-image-container">
        <img src={imageSrc} alt={product.name} className="product-detail-image" />
      </div>

      <p className="product-detail-desc">{product.description}</p>

      <div className="product-detail-price">
        Price: {product.price} đ
      </div>

      <div className="product-detail-current-price">
        Current Price: {product.currentPrice} đ
      </div>

      <div className="product-detail-discount">
        Discount: {discountPercent} %
      </div>

      <div className="product-detail-actions">
        <button 
          className="btn-back-home" 
          onClick={() => navigate('/')}
        >
          Back Home
        </button>
        <button 
          className="btn-edit-product-detail" 
          onClick={() => navigate(`/product/${product.id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
