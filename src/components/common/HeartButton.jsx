import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/HeartButton.css';

const HeartButton = ({ initialState = false, onClick }) => {
  const [isLiked, setIsLiked] = useState(initialState);

  const handleClick = () => {
    setIsLiked(!isLiked);
    if (onClick) {
      onClick(!isLiked);
    }
  };

  return (
    <button
      className={`heart-button ${isLiked ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={isLiked ? '찜하기 취소' : '찜하기'}
    >
      <div className="heart-icon"></div>
    </button>
  );
};

HeartButton.propTypes = {
  initialState: PropTypes.bool,
  onClick: PropTypes.func,
};

export default HeartButton;
