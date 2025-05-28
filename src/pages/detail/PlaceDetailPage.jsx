import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import '../../styles/pages/PlaceDetailPage.css';
import HeartButton from '../../components/common/HeartButton';
import { generateDummyReviews } from '../../constants/dummyData';

const PlaceDetailPage = ({ place, onClose, onToggleLike }) => {
  const [reviews] = useState(generateDummyReviews(3));
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleReservation = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const handleConfirmBooking = () => {
    if (selectedDate) {
      console.log('예약 날짜:', format(selectedDate, 'yyyy-MM-dd'));
      alert(
        `${format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko })}로 예약되었습니다.`,
      );
      setShowCalendar(false);
      setSelectedDate(null);
    }
  };

  const handleCancelBooking = () => {
    setShowCalendar(false);
    setSelectedDate(null);
  };

  // 오늘 이전 날짜는 선택 불가
  const disabledDays = { before: new Date() };

  const css = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-accent-color: #0051ff;
      --rdp-background-color: #f5f5f5;
      color: #333;
      margin: 0;
    }
    .rdp-day_selected:not([disabled]) { 
      font-weight: bold; 
      background-color: var(--rdp-accent-color);
      color: white !important;
    }
    .rdp-day_selected:hover:not([disabled]) { 
      background-color: #0045db;
      color: white;
    }
    .rdp-day_today { 
      font-weight: bold;
      color: var(--rdp-accent-color) !important;
      background-color: transparent;
    }
    .rdp-button:hover:not([disabled]) {
      background-color: var(--rdp-background-color);
      color: var(--rdp-accent-color);
    }
    .rdp-day_outside {
      opacity: 0.5;
      color: #666;
    }
  `;

  return (
    <div className="place-detail-page">
      <div className="place-image">
        {place.image ? (
          <img src={place.image} alt={place.name} />
        ) : (
          <div className="image-placeholder"></div>
        )}

        {/* 헤더 버튼들 */}
        <div className="detail-header">
          <button className="back-button" onClick={onClose} />
          <button className="close-button" onClick={onClose} />
        </div>
      </div>

      <div className="detail-content">
        {/* 장소 정보 */}
        <div className="place-info">
          <div className="place-header">
            <h1 className="place-name">{place.name || '스타벅스'}</h1>
            <HeartButton
              isLiked={place.isLiked}
              onToggle={() => onToggleLike && onToggleLike(place.id)}
            />
          </div>

          <p className="place-description">
            {place.description || '여기는 설명을 적는 곳입니다.'}
          </p>

          <div className="place-meta">
            <span>
              리뷰 {place.reviewCount || 60}개 / 평균{' '}
              {place.averagePrice?.toLocaleString() || '10,000'}원
            </span>
          </div>

          {/* 상세 정보 항목들 */}
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">주소</span>
            </div>
            <div className="info-item">
              <span className="info-label">영업시간</span>
            </div>
            <div className="info-item">
              <span className="info-label">전화번호</span>
            </div>
            <div className="info-item">
              <span className="info-label">주차</span>
            </div>
          </div>
        </div>

        {!showCalendar && (
          <>
            {/* 예약하기 버튼 */}
            <div className="action-section">
              <button
                className="reservation-button"
                onClick={handleReservation}
              >
                예약하기
              </button>
            </div>

            {/* 리뷰 섹션 */}
            <div className="review-section scrollbar">
              <h3>리뷰</h3>
              <div className="review-images">
                {[1, 2].map(index => (
                  <div key={index} className="review-image-item">
                    <div className="review-image-placeholder" />
                  </div>
                ))}
              </div>
              <div className="review-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-content">
                      <div className="user-icon" />
                      <span className="user-id">user{review.id}302382</span>
                      <p className="review-text">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 달력 섹션 */}
        {showCalendar && (
          <div className="calendar-section scrollbar">
            <style>{css}</style>
            <div className="calendar-header">
              <h3>날짜를 선택해 주세요</h3>
            </div>

            <div className="calendar-container">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                locale={ko}
                modifiers={{
                  today: new Date(),
                }}
                modifiersStyles={{
                  today: { fontWeight: 'bold' },
                }}
                styles={{
                  caption: { color: '#333' },
                  head_cell: { color: '#666', fontWeight: '500' },
                  button: { color: '#333' },
                }}
              />
            </div>

            <div className="calendar-actions">
              <button className="cancel-button" onClick={handleCancelBooking}>
                취소
              </button>
              <button
                className="confirm-button"
                onClick={handleConfirmBooking}
                disabled={!selectedDate}
              >
                예약
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PlaceDetailPage.propTypes = {
  place: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func,
};

export default PlaceDetailPage;
