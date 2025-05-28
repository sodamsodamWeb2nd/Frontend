import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/pages/MainPage.css';
import '../styles/components/MainLayout.css';
import HeartButton from '../components/common/HeartButton';

const MainPage = () => {
  const context = useOutletContext();
  const onPlaceSelect = context?.onPlaceSelect;

  const [places, setPlaces] = useState([
    {
      id: 1,
      name: '스타벅스',
      description: '여기는 설명을 적는 곳입니다.',
      reviewCount: 6,
      averagePrice: 10000,
      lat: 36.7794,
      lng: 127.1378,
      image: null,
      isLiked: false,
    },
    {
      id: 2,
      name: '스타벅스',
      description: '여기는 설명을 적는 곳입니다.',
      reviewCount: 6,
      averagePrice: 10000,
      lat: 36.7794,
      lng: 127.1378,
      image: null,
      isLiked: false,
    },
    {
      id: 3,
      name: '스타벅스',
      description: '여기는 설명을 적는 곳입니다.',
      reviewCount: 6,
      averagePrice: 10000,
      lat: 36.7794,
      lng: 127.1378,
      image: null,
      isLiked: false,
    },
  ]);

  const [sortOption, setSortOption] = useState('조회순');

  const handleLikeToggle = placeId => {
    setPlaces(
      places.map(place =>
        place.id === placeId ? { ...place, isLiked: !place.isLiked } : place,
      ),
    );
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
                  onToggle={e => {
                    e.stopPropagation();
                    handleLikeToggle(place.id);
                  }}
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
