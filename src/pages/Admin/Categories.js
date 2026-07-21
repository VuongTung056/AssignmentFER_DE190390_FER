import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, deleteCategory } from '../../store/slices/categoriesSlice';
import { toast } from 'react-toastify';

const Categories = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(s => s.categories);
  const [name, setName] = useState('');

  useEffect(()=>{ dispatch(fetchCategories()); }, [dispatch]);

  const handleAdd = async () => {
    if (!name) return toast.error('Enter category name');
    const res = await dispatch(addCategory({ id: Date.now().toString(), name }));
    if (res.payload) { toast.success('Added'); setName(''); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete category?')) return;
    await dispatch(deleteCategory(id));
    toast.info('Deleted');
  };

  return (
    <div className="admin-categories">
      <h3>Categories</h3>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Category name" />
        <button onClick={handleAdd}>Add</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <ul>
          {items.map(c=> (
            <li key={c.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>{c.name}</span>
              <button onClick={()=>handleDelete(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
