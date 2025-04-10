import React from 'react';
import './Card.css';

const Card = ({ title, text, imgSrc }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <a href="#">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={title}
              className="card-image"
            />
          )}
          <h2 className="card-title">{title}</h2>
          <p className="card-text">{text}</p>
        </a>
      </div>
    </div>
  );
};

export default Card;
