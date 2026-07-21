import React from 'react';

const Spinner = ({ text = 'Loading...' }) => (
  <div className="loading-spinner">{text}</div>
);

export default Spinner;
