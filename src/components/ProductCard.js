import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

// import images
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

const calcDiscount = (price, currentPrice) => {
  const p = parseFloat(String(price).replace(/\D/g, '')) || 0;
  const c = parseFloat(String(currentPrice).replace(/\D/g, '')) || 0;
  if (p > 0 && p > c) return Math.round(((p - c) / p) * 100);
  return 0;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const discount = calcDiscount(product.price, product.currentPrice);

  const badges = [];
  if (product.tags?.includes('hot')) badges.push('Hot');
  if (product.tags?.includes('new')) badges.push('New');
  if (discount >= 10) badges.push('Sale');

  const handleAdd = () => {
    const priceNum = Number(String(product.currentPrice).replace(/\D/g,'')) || 0;
    dispatch(addToCart({ productId: product.id, name: product.name, price: priceNum, image: product.images?.[0] || product.image }));
    toast.success('Added to cart');
  };

  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={imageMap[product.image] || laptop1} alt={product.name} className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-badges">
          {badges.map(b => <span key={b} className={`badge badge-${b.toLowerCase()}`}>{b}</span>)}
        </div>
        <h4 className="card-title">{product.name}</h4>
        <p className="card-desc">{product.description}</p>
        <div className="card-price-section">
          <div className="card-original-price">{product.price} đ</div>
          <div className="card-current-price">{product.currentPrice} đ</div>
          {discount > 0 && <div className="discount">-{discount}%</div>}
        </div>
        <div className="card-actions">
          <button className="btn-view-details" onClick={() => navigate(`/product/${product.id}`)}>View</button>
          <button className="btn-add-cart" onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
