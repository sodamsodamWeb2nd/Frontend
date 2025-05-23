import React from 'react';

function CourseItem({ id, name, description, image, rating, address }) {
  return (
    <div className="course-item">
      {image && (
        <div className="course-item__image">
          <img src={image} alt={name} />
        </div>
      )}
      <div className="course-item__content">
        <h3 className="course-item__name">{name}</h3>
        {description && (
          <p className="course-item__description">{description}</p>
        )}
        {address && (
          <p className="course-item__address">{address}</p>
        )}
        {rating && (
          <div className="course-item__rating">
            <span>⭐ {rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseItem;