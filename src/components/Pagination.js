import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="pagination">
      {pages.map(p => (
        <button key={p} className={p===currentPage? 'active' : ''} onClick={()=>onPageChange(p)}>{p}</button>
      ))}
    </div>
  );
};

export default Pagination;
