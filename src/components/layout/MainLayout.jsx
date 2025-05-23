import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MapPage from '../../pages/MapPage';
import '../../styles/MainLayout.css';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="map-container">
          <MapPage />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
