import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/pages/MainPage.css';
import '../styles/components/MainLayout.css';
import HeartButton from '../components/common/HeartButton';
import { placeService } from '../service/placeService';

const MainPage = () => {
  const context = useOutletContext();
  const onPlaceSelect = context?.onPlaceSelect;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('조회순');

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const data = await placeService.getPlaces();
      setPlaces(data);
      setError(null);
    } catch (error) {
      console.error('장소 목록 로딩 실패:', error);
      setError('장소 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async (placeId, e) => {
    e.stopPropagation();
    try {
      await placeService.toggleLike(placeId);
      setPlaces(
        places.map(place =>
          place.id === placeId ? { ...place, isLiked: !place.isLiked } : place,
        ),
      );
    } catch (error) {
      console.error('찜하기 처리 실패:', error);
    }
  };

  const formatPrice = price => {
    return price.toLocaleString();
  };

  const handleSortChange = option => {
    setSortOption(option);
    let sortedPlaces = [...places];

    switch (option) {
      case '조회순':
        sortedPlaces.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case '가격순':
        sortedPlaces.sort((a, b) => a.averagePrice - b.averagePrice);
        break;
      default:
        break;
    }

    setPlaces(sortedPlaces);
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="main-page">
      <div className="main-header">
        <h1 className="page-title">천안 신부동</h1>
        <div className="sort-dropdown">
          <select
            value={sortOption}
            onChange={e => handleSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="조회순">조회순</option>
            <option value="가격순">가격순</option>
          </select>
        </div>
      </div>

      <div className="place-list">
        {places.map(place => (
          <div
            key={place.id}
            className="place-card"
            onClick={() => onPlaceSelect?.(place)}
          >
            <div className="place-image">
              {place.image ? (
                <img src={place.image} alt={place.name} />
              ) : (
                <div className="image-placeholder" />
              )}
            </div>
            <div className="place-info">
              <div className="place-header">
                <h2 className="place-name">{place.name}</h2>
                <HeartButton
                  isLiked={place.isLiked}
                  onToggle={e => handleLikeToggle(place.id, e)}
                />
              </div>
              <p className="place-description">{place.description}</p>
              <div className="place-meta">
                <span className="review-info">
                  리뷰 {place.reviewCount}개 | 평균{' '}
                  {formatPrice(place.averagePrice)}원
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
