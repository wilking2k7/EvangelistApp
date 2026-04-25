import React from 'react';

const Card = ({ children, title, className = "" }) => {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {title && <h3 className="text-xl font-bold mb-6 text-white">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
