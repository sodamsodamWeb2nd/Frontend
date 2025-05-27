import React, { useState } from 'react';
import '../styles/LikedPlacePage.css';
import HeartButton from '../components/common/HeartButton';

function LikedPlacePage() {
  const [places, setPlaces] = useState([
    {
      id: 1,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: true,
      images: [
        '/path/to/image1.jpg',
      ],
    },
    {
      id: 2,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: true,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
      ],
    },
    {
      id: 2,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: true,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
      ],
    },
    {
      id: 2,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: true,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
      ],
    },
    {
      id: 2,
      title: '스타벅스',
      subtitle: '휴식 같은 당신의 신세계 백화점',
      isLiked: true,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
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

  return (
    <div className="liked-place-page">
      {places.map(place => (
        <div key={place.id} className="place-section">
          <div className="place-header">
            <h2>{place.title}</h2>
            <HeartButton
              isLiked={place.isLiked}
              onClick={() => handleLikeToggle(place.id)}
            />
          </div>
          <p className="place-subtitle">{place.subtitle}</p>
          <div className="image-grid">
            {place.images.map((image, index) => (
              <div key={index} className="grid-image">
                <img src={image} alt={`${place.title} 이미지 ${index + 1}`} />
              </div>
            ))}
          </div>
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
