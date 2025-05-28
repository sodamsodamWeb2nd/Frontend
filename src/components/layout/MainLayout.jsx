import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import Map from './Map';
import PlaceDetailPage from '../../pages/detail/PlaceDetailPage';
import '../../styles/components/MainLayout.css';

const MainLayout = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = place => {
    setSelectedPlace(place);
  };

  const handleCloseDetail = () => {
    setSelectedPlace(null);
  };

  const handleToggleLike = () => {
    // TODO: 좋아요 토글 로직 구현
  };

  return (
    <div className="main-layout">
      <Header />
      <div className="content-wrapper">
        <aside className="sidebar-container">
          <Sidebar onPlaceSelect={handlePlaceSelect} />
        </aside>
        <div className="map-container">
          <Map
            onPlaceSelect={handlePlaceSelect}
            selectedPlace={selectedPlace}
          />
        </div>
        {selectedPlace && (
          <div className="detail-container">
            <PlaceDetailPage
              place={selectedPlace}
              onClose={handleCloseDetail}
              onToggleLike={handleToggleLike}
            />
          </div>
        )}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  // 현재는 props가 없지만, 향후 확장성을 위해 PropTypes 정의
};

export default MainLayout;
