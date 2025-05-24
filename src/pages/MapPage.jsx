import React, { useEffect, useState } from 'react';

function MapPage() {
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    const waitForKakao = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve();
          return;
        }

        const maxWaitTime = 10000;
        const interval = 100;
        let waited = 0;

        const checker = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checker);
            resolve();
            return;
          }

          waited += interval;
          if (waited >= maxWaitTime) {
            clearInterval(checker);
            reject(new Error('카카오맵 API 로드 시간 초과'));
          }
        }, interval);
      });
    };

    const initMap = async () => {
      try {
        await waitForKakao();

        await new Promise((resolve, reject) => {
          window.kakao.maps.load(() => {
            try {
              const container = document.getElementById('map');
              const options = {
                center: new window.kakao.maps.LatLng(36.851558, 127.151092), // 공주대학교 천안공과대학 좌표
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);

              const marker = new window.kakao.maps.Marker({
                position: options.center,
              });

              marker.setMap(map);

              resolve(map);
            } catch (error) {
              reject(error);
            }
          });
        });
      } catch (error) {
        console.error('카카오맵 초기화 중 오류:', error.message);
        setMapError(error.message);
      }
    };

    initMap();
  }, []);

  return (
    <div className="map-page">
      <div id="map" className="map-container">
        {mapError && (
          <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
            {mapError}
          </div>
        )}
      </div>
    </div>
  );
}

export default MapPage;
