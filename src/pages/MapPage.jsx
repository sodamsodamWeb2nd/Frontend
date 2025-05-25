import React, { useEffect, useState } from 'react';
import '../styles/MainLayout.css';

function MapPage() {
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    try {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(36.851558, 127.151092),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: options.center,
        });

        marker.setMap(map);
      });
    } catch (error) {
      console.error('카카오맵 초기화 중 오류:', error.message);
      setMapError(error.message);
    }
  }, []);

  return (
    <div id="map" className="map-container">
      {mapError && <div className="error-message">{mapError}</div>}
    </div>
  );
}

export default MapPage;
