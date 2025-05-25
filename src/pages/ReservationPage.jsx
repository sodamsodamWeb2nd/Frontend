import React from 'react';
import '../styles/CardLayout.css';

function ReservationPage() {
  const reservations = [
    {
      id: 1,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
    },
    {
      id: 2,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
    },
  ];

  const handleCancelReservation = id => {
    console.log('예약 취소:', id);
  };

  return (
    <div className="card-page">
      <div className="card-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="card-item">
            <div className="card-main">
              <div className="card-content">
                <div className="card-info">
                  <h3 className="card-title">{reservation.storeName}</h3>
                  <p className="card-date">{reservation.date}</p>
                  <p className="card-description">{reservation.address}</p>
                </div>
                <div className="card-image">
                  {reservation.imageUrl && (
                    <img
                      src={reservation.imageUrl}
                      alt={reservation.storeName}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="card-button-wrapper">
              <button
                className="card-button"
                onClick={() => handleCancelReservation(reservation.id)}
              >
                예약 취소
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationPage;
