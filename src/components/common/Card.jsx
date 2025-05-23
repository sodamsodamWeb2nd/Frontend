import React from 'react';

function Card({ title, children }) {
  return (
    <div className="card">
      {title && <div className="card__title">{title}</div>}
      <div className="card__content">{children}</div>
    </div>
  );
}

export default Card;
