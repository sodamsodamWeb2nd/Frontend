import React, { useState } from 'react';
import '../styles/CardLayout.css';

function ReservationPage() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isCancelling: false,
    },
    {
      id: 2,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isCancelling: false,
    },
    {
      id: 3,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isCancelling: false,
    },
    {
      id: 4,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isCancelling: false,
    },
    {
      id: 5,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isCancelling: false,
    },
    {
      id: 6,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isCancelling: false,
    },
  ]);

  const handleCancelClick = id => {
    setReservations(
      reservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, isCancelling: true }
          : reservation,
      ),
    );
  };

  const handleCancelConfirm = id => {
    // 여기에 실제 예약 취소 API 호출 로직 추가
    console.log('예약 취소 확정:', id);
    setReservations(
      reservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, isCancelled: true, isCancelling: false }
          : reservation,
      ),
    );
  };

  const handleCancelCancel = id => {
    setReservations(
      reservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, isCancelling: false }
          : reservation,
      ),
    );
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
                  {reservation.imageUrl ? (
                    <img
                      src={reservation.imageUrl}
                      alt={reservation.storeName}
                    />
                  ) : (
                    <div className="image-placeholder" />
                  )}
                </div>
              </div>
            </div>
            <div className="card-button-wrapper">
              {reservation.isCancelled ? (
                <button className="card-button" disabled>
                  취소 완료
                </button>
              ) : !reservation.isCancelling ? (
                <button
                  className="card-button"
                  onClick={() => handleCancelClick(reservation.id)}
                >
                  예약 취소
                </button>
              ) : (
                <div className="button-group">
                  <button
                    className="card-button cancel"
                    onClick={() => handleCancelCancel(reservation.id)}
                  >
                    취소
                  </button>
                  <button
                    className="card-button confirm"
                    onClick={() => handleCancelConfirm(reservation.id)}
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationPage;
