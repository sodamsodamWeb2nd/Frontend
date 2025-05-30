import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/pages/LikedPlacePage.css';
import '../styles/components/MainLayout.css';
import HeartButton from '../components/common/HeartButton';
import { placeService } from '../service/placeService';

function LikedPlacePage() {
  const context = useOutletContext();
  const onPlaceSelect = context?.onPlaceSelect;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLikedPlaces();
  }, []);

  const fetchLikedPlaces = async () => {
    try {
      setLoading(true);
      const data = await placeService.getLikedPlaces();
      setPlaces(data);
      setError(null);
    } catch (error) {
      console.error('찜한 장소 목록 로딩 실패:', error);
      setError('찜한 장소 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async (placeId, e) => {
    e.stopPropagation();
    try {
      await placeService.toggleLike(placeId);
      await fetchLikedPlaces(); // 찜 목록 새로고침
    } catch (error) {
      console.error('찜하기 처리 실패:', error);
    }
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

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="liked-place-page">
      {places.map(place => (
        <div
          key={place.id}
          className="place-section"
          onClick={() => onPlaceSelect?.(place)}
        >
          <div className="place-header">
            <h2>{place.name}</h2>
            <HeartButton
              isLiked={place.isLiked}
              onToggle={e => handleLikeToggle(place.id, e)}
            />
          </div>
          <p className="place-subtitle">{place.description}</p>
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
