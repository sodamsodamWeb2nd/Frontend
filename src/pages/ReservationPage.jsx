import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/CardLayout.css';
import { generateDummyReservations } from '../constants/dummyData';

function ReservationPage() {
  const [reservations, setReservations] = useState(generateDummyReservations());

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
    // TODO: 예약 취소 API 호출 구현
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

ReservationPage.propTypes = {
  // 현재는 props가 없지만, 향후 확장성을 위해 PropTypes 정의
};

export default ReservationPage;
