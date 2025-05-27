import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Map from '../layout/Map';
import '../../styles/MainLayout.css';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="map-container">
          <Map />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
