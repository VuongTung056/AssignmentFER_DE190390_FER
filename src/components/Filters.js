import React, { useState, useEffect } from 'react';

const BRANDS = ['Asus','Acer','Dell','MSI','LG','Lenovo','HP','Apple'];

const Filters = ({ onSearch, onFilterChange, onSortChange }) => {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const timeout = setTimeout(()=> onSearch(query), 300);
    return ()=>clearTimeout(timeout);
  }, [query]);

  useEffect(()=>{
    onFilterChange({ brand, minPrice: minPrice ? Number(minPrice) : null, maxPrice: maxPrice ? Number(maxPrice) : null });
  }, [brand, minPrice, maxPrice]);

  useEffect(()=>{ onSortChange(sort); }, [sort]);

  return (
    <div className="filters">
      <input placeholder="Search product name or brand" value={query} onChange={(e)=>setQuery(e.target.value)} />
      <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
        <option value="">All brands</option>
        {BRANDS.map(b=> <option key={b} value={b}>{b}</option>)}
      </select>
      <input placeholder="Min price" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} />
      <input placeholder="Max price" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
      <select value={sort} onChange={(e)=>setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A-Z</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default Filters;
