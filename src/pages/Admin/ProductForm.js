import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const ProductForm = ({ onSubmit, defaultValues = {} }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues });
  const categories = useSelector(s => s.categories.items || []);
  const [images, setImages] = useState(defaultValues.images || (defaultValues.image ? [defaultValues.image] : []));

  useEffect(()=>{ dispatch(fetchCategories()); }, [dispatch]);

  useEffect(()=>{ setValue('images', images); }, [images]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await toBase64(file);
    setImages(prev => [...prev, dataUrl]);
  };

  const handleAddUrl = (e) => {
    const url = e.target.previousSibling.value;
    if (url) {
      setImages(prev => [...prev, url]);
      e.target.previousSibling.value = '';
    }
  };

  const removeImage = (idx) => setImages(prev => prev.filter((_,i)=>i!==idx));

  const internalSubmit = (data) => {
    const payload = { ...data, images };
    if (!payload.brand) payload.brand = data.brand || '';
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="product-form-card">
      <div className="form-group"><label>Name</label><input {...register('name', { required: true })} /></div>
      <div className="form-group"><label>Brand</label>
        <select {...register('brand', { required: true })}>
          <option value="">Select Brand</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>
      <div className="form-group"><label>Price</label><input type="number" {...register('price', { required: true, valueAsNumber: true })} /></div>
      <div className="form-group"><label>Current Price</label><input type="number" {...register('currentPrice', { required: true, valueAsNumber: true })} /></div>
      <div className="form-group"><label>Description</label><textarea {...register('description')} /></div>

      <div className="form-group"><label>Images</label>
        <div style={{display:'flex',gap:8,flexDirection:'column'}}>
          <div style={{display:'flex',gap:8}}>
            <input type="file" accept="image/*" onChange={handleFile} />
            <input placeholder="Image URL" />
            <button type="button" onClick={handleAddUrl}>Add URL</button>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {images.map((img, idx) => (
              <div key={idx} style={{position:'relative'}}>
                <img src={img} alt={`img-${idx}`} style={{width:120,height:80,objectFit:'cover'}} />
                <button type="button" onClick={()=>removeImage(idx)} style={{position:'absolute',right:4,top:4}}>x</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <input type="hidden" {...register('images')} />
      <div className="form-actions"><button type="submit">Save</button></div>
    </form>
  );
};

export default ProductForm;
