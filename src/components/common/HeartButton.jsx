import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/HeartButton.css';

const HeartButton = ({ isLiked = false, onToggle }) => {
  return (
    <button
      className={`heart-button ${isLiked ? 'liked' : ''}`}
      onClick={onToggle}
      aria-label={isLiked ? '찜하기 취소' : '찜하기'}
    >
      <div className="heart-icon"></div>
    </button>
  );
};

HeartButton.propTypes = {
  isLiked: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default HeartButton;
