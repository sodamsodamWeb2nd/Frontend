import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Map.css';

const Map = ({ onPlaceSelect, selectedPlace }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  const places = [
    {
      id: 1,
      name: '스타벅스',
      description: '맛있는 커피와 좋은 분위기',
      reviewCount: 6,
      averagePrice: 10000,
      lat: 36.7794,
      lng: 127.1378,
      isLiked: false,
    },
    // ... 더 많은 장소들
  ];

  useEffect(() => {
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao Maps API is not loaded');
        return;
      }

      try {
        const options = {
          center: new window.kakao.maps.LatLng(36.7794, 127.1378),
          level: 3,
        };

        const kakaoMap = new window.kakao.maps.Map(
          mapContainer.current,
          options,
        );
        setMap(kakaoMap);
        setIsKakaoLoaded(true);

        // 마커 생성 및 클릭 이벤트
        places.forEach(place => {
          const markerPosition = new window.kakao.maps.LatLng(
            place.lat,
            place.lng,
          );

          const content = `
            <div class="custom-marker" data-place-id="${place.id}">
              <div class="marker-content">
                <span class="place-name">${place.name}</span>
                <span class="place-price">₩${place.averagePrice.toLocaleString()}</span>
              </div>
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            yAnchor: 1,
          });

          customOverlay.setMap(kakaoMap);
        });

        // 마커 클릭 이벤트
        mapContainer.current.addEventListener('click', e => {
          const marker = e.target.closest('.custom-marker');
          if (marker) {
            const placeId = parseInt(marker.dataset.placeId);
            const place = places.find(p => p.id === placeId);
            if (place) {
              onPlaceSelect(place);
            }
          }
        });
      } catch (error) {
        console.error('Error initializing Kakao Maps:', error);
      }
    };

    const initializeKakaoMaps = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(loadKakaoMap);
      } else {
        console.error('Kakao Maps SDK is not loaded properly');
      }
    };

    if (mapContainer.current && !isKakaoLoaded) {
      initializeKakaoMaps();
    }
  }, [onPlaceSelect, isKakaoLoaded]);

  useEffect(() => {
    if (!map || !selectedPlace) return;

    // 선택된 장소로 지도 중심 이동
    const moveToPlace = () => {
      try {
        const position = new window.kakao.maps.LatLng(
          selectedPlace.lat || 36.7794,
          selectedPlace.lng || 127.1378,
        );
        map.setCenter(position);
      } catch (error) {
        console.error('Error moving map to selected place:', error);
      }
    };

    moveToPlace();
  }, [map, selectedPlace]);

  return (
    <div className="map-container">
      <div ref={mapContainer} id="map" className="map-container"></div>
    </div>
  );
};

Map.propTypes = {
  onPlaceSelect: PropTypes.func.isRequired,
  selectedPlace: PropTypes.object,
};

export default Map;
