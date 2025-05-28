import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/pages/LikedPlacePage.css';
import '../styles/components/MainLayout.css';
import HeartButton from '../components/common/HeartButton';

function LikedPlacePage() {
  const context = useOutletContext();
  const onPlaceSelect = context?.onPlaceSelect;

  const [places, setPlaces] = useState([
    {
      id: 1,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: false,
      images: ['/path/to/image1.jpg'],
    },
    {
      id: 2,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: false,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
        '/path/to/image4.jpg',
        '/path/to/image5.jpg',
      ],
    },
    {
      id: 3,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: false,
      images: [],
    },
    {
      id: 4,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: true,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
        '/path/to/image4.jpg',
      ],
    },
  ]);

  const handleLikeToggle = placeId => {
    setPlaces(
      places.map(place =>
        place.id === placeId ? { ...place, isLiked: !place.isLiked } : place,
      ),
    );
  };

  const renderImages = images => {
    if (!images || images.length === 0) {
      return (
        <div className="empty-images">
          <span>이미지 없음</span>
        </div>
      );
    }

    const displayImages = images.slice(0, 5);
    return (
      <div className="image-scroll-container">
        <div className="image-scroll-wrapper">
          {displayImages.map((image, index) => (
            <div key={index} className="scroll-image">
              <img src={image} alt={`이미지 ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="image-count-indicator">{displayImages.length}장</div>
      </div>
    );
  };

  return (
    <div className="liked-place-page">
      {places.map(place => (
        <div
          key={place.id}
          className="place-section"
          onClick={() => onPlaceSelect?.(place)}
        >
          <div className="place-header">
            <h2>{place.title}</h2>
            <HeartButton
              isLiked={place.isLiked}
              onClick={() => handleLikeToggle(place.id)}
            />
          </div>
          <p className="place-subtitle">{place.subtitle}</p>
          {renderImages(place.images)}
        </div>
      ))}
      {places.length === 0 && (
        <div className="empty-state">
          <img src="/img/heart-icon.svg" alt="빈 하트" width="32" height="32" />
          <p>하트를 눌러 원하는 장소를 추가해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default LikedPlacePage;
