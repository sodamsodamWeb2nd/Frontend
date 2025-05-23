import React, { useEffect } from 'react';
import '../styles/MapPage.css';

function MapPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="map-page">
      <div id="map" className="map-container">
        {/* 카카오맵이 여기에 렌더링됩니다 */}
      </div>
    </div>
  );
}

export default MapPage;
