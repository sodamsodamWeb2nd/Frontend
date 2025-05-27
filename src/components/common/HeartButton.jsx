import React from 'react';
import '../../styles/HeartButton.css';

function HeartButton({ isLiked, onClick }) {
  return (
    <button className="heart-button" onClick={onClick}>
      <img
        src={isLiked ? '/img/heart-fill-icon.svg' : '/img/heart-icon.svg'}
        alt={isLiked ? '찜하기 취소' : '찜하기'}
      />
    </button>
  );
}

export default HeartButton;
