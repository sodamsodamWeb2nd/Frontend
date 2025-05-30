import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/CardLayout.css';
import { reservationService } from '../service/reservationService';

function ReservationPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getReservations();
      setReservations(data);
      setError(null);
    } catch (error) {
      console.error('예약 목록 로딩 실패:', error);
      setError('예약 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = id => {
    setReservations(
      reservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, isCancelling: true }
          : reservation,
      ),
    );
  };

  const handleCancelConfirm = async id => {
    try {
      await reservationService.cancelReservation(id);
      await fetchReservations(); // 예약 목록 새로고침
    } catch (error) {
      console.error('예약 취소 실패:', error);
    }
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

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="card-page">
      <div className="card-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="card-item">
            <div className="card-main">
              <div className="card-content">
                <div className="card-info">
                  <h3 className="card-title">{reservation.placeName}</h3>
                  <p className="card-date">{reservation.reservationDate}</p>
                  <p className="card-description">{reservation.placeAddress}</p>
                </div>
                <div className="card-image">
                  {reservation.imageUrl ? (
                    <img
                      src={reservation.imageUrl}
                      alt={reservation.placeName}
                    />
                  ) : (
                    <div className="image-placeholder" />
                  )}
                </div>
              </div>
            </div>
            <div className="card-button-wrapper">
              {reservation.status === 'CANCELLED' ? (
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
