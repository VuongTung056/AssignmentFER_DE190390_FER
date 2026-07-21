import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, clearCurrent } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

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
  const cartDispatch = useDispatch();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);
  const products = useSelector(s => s.products.items || []);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearCurrent());
    };
  }, [dispatch, id]);

  useEffect(()=>{
    if (product) setSelectedImage(product.images?.[0] || product.image || null);
  }, [product]);

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
  const imageSrc = selectedImage ? (imageMap[selectedImage] || selectedImage) : (imageMap[product.image] || laptop1);

  const handleAddToCart = () => {
    const priceNum = Number(String(product.currentPrice).replace(/\D/g,'')) || 0;
    cartDispatch(addToCart({ productId: product.id, name: product.name, price: priceNum, image: product.images?.[0] || product.image }));
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">{product.name}</h2>

      <div className="product-detail-main">
        <div className="product-detail-image-container">
          <img src={imageSrc} alt={product.name} className="product-detail-image" />
          {product.images && product.images.length > 1 && (
            <div className="thumbnails">
              {product.images.map((img) => (
                <img key={img} src={imageMap[img] || img} alt={img} className={`thumb ${selectedImage===img? 'active':''}`} onClick={()=>setSelectedImage(img)} />
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-meta">
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-price">Price: {product.price} đ</div>
          <div className="product-detail-current-price">Current Price: {product.currentPrice} đ</div>
          <div className="product-detail-discount">Discount: {discountPercent} %</div>

          {product.specs && (
            <div className="product-specs">
              <h4>Specifications</h4>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([k,v])=> (
                    <tr key={k}><td className="spec-key">{k}</td><td className="spec-val">{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
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
        <button className="btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
        <button className="btn-buy-now" onClick={handleBuyNow}>Buy Now</button>
        <button 
          className="btn-edit-product-detail" 
          onClick={() => navigate(`/product/${product.id}/edit`)}
        >
          Edit
        </button>
      </div>

      {/** Related products **/}
      <div className="related-products">
        <h3>Related Products</h3>
        <div className="product-grid">
          {products.filter(p=>p.id!==product.id && (p.brand===product.brand)).slice(0,4).map(p=> (
            <div key={p.id}><img src={imageMap[p.image] || laptop1} alt={p.name} style={{width:160}} /><div>{p.name}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
