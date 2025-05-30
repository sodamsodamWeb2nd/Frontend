import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import '../../styles/pages/PlaceDetailPage.css';
import HeartButton from '../../components/common/HeartButton';
import { placeService } from '../../service/placeService';
import { reservationService } from '../../service/reservationService';
import { reviewService } from '../../service/reviewService';

const PlaceDetailPage = ({ place_id, onClose, onToggleLike }) => {
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlaceDetail();
    fetchReviews();
  }, [place_id]);

  const fetchPlaceDetail = async () => {
    try {
      setLoading(true);
      const data = await placeService.getPlaceDetail(place_id);
      setPlace(data);
      setError(null);
    } catch (error) {
      console.error('장소 상세 정보 로딩 실패:', error);
      setError('장소 상세 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getReviews({ place_id });
      setReviews(data);
    } catch (error) {
      console.error('리뷰 목록 로딩 실패:', error);
    }
  };

  const handleReservation = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = async date => {
    setSelectedDate(date);
    try {
      const times = await reservationService.getAvailableTime(
        place_id,
        format(date, 'yyyy-MM-dd'),
      );
      setAvailableTimes(times);
    } catch (error) {
      console.error('예약 가능 시간 조회 실패:', error);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedDate && selectedTime) {
      try {
        await reservationService.createReservation({
          place_id,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
        });
        alert(
          `${format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko })} ${selectedTime}에 예약되었습니다.`,
        );
        setShowCalendar(false);
        setSelectedDate(null);
        setSelectedTime(null);
      } catch (error) {
        console.error('예약 생성 실패:', error);
        alert('예약에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleCancelBooking = () => {
    setShowCalendar(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleLikeToggle = async () => {
    try {
      await placeService.toggleLike(place_id);
      setPlace(prev => ({ ...prev, isLiked: !prev.isLiked }));
      onToggleLike?.(place_id);
    } catch (error) {
      console.error('찜하기 처리 실패:', error);
    }
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const disabledDays = {
    before: today,
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!place) {
    return null;
  }

  return (
    <div className="place-detail-page">
      <div className="place-image">
        {place.image && <img src={place.image} alt={place.place_name} />}
        <div className="detail-header">
          <button className="back-button" onClick={onClose} />
          <button className="close-button" onClick={onClose} />
        </div>
      </div>

      <div className="detail-content">
        <div className="place-info2">
          <div className="place-header2">
            <h1 className="place-name2">{place.place_name}</h1>
            <HeartButton isLiked={place.isLiked} onToggle={handleLikeToggle} />
          </div>
          <p className="place-meta2">{place.description}</p>
          <div className="place-meta2">
            <span>
              리뷰 {place.reviewCount}개 / 평균{' '}
              {place.averagePrice?.toLocaleString()}원
            </span>
          </div>
          <div className="place-info-list">
            <div className="place-info-item">
              <span className="place-info-label">주소</span>
              <span>{place.address}</span>
            </div>
            <div className="place-info-item">
              <span className="place-info-label">영업시간</span>
              <span>{place.businessHours}</span>
            </div>
            <div className="place-info-item">
              <span className="place-info-label">전화번호</span>
              <span>{place.phoneNumber}</span>
            </div>
            <div className="place-info-item">
              <span className="place-info-label">주차</span>
              <span>{place.parking ? '가능' : '불가능'}</span>
            </div>
          </div>
        </div>

        {!showCalendar ? (
          <>
            <button className="reservation-button" onClick={handleReservation}>
              예약하기
            </button>

            <div className="review-section scrollbar">
              <h3>리뷰</h3>
              <div className="review-images">
                {reviews.slice(0, 2).map(review =>
                  review.images?.map((image, index) => (
                    <div
                      key={`${review.review_id}-${index}`}
                      className="review-image-item"
                    >
                      <img
                        src={image.image_url}
                        alt={`리뷰 이미지 ${index + 1}`}
                      />
                    </div>
                  )),
                )}
              </div>
              <div className="review-list">
                {reviews.map(review => (
                  <div key={review.review_id} className="review-content">
                    <div className="user-icon">
                      {review.userProfileImage && (
                        <img src={review.userProfileImage} alt="프로필" />
                      )}
                    </div>
                    <p className="user-id">{review.user_name}</p>
                    <span>{review.content}</span>
                    {review.tags && review.tags.length > 0 && (
                      <div className="review-tags">
                        {review.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            #{tag.content}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="calendar-section scrollbar">
            <div className="calendar-header">
              <h3>날짜를 선택해 주세요</h3>
            </div>
            <div className="calendar-container">
              <DayPicker
                id="reservation-date"
                name="reservation-date"
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                locale={ko}
                showOutsideDays={false}
                fixedWeeks={false}
                classNames={{
                  root: 'rdp',
                  caption: 'rdp-caption',
                  day: 'rdp-day',
                  day_button: 'rdp-button',
                  day_selected: 'rdp-day_selected',
                  day_today: 'rdp-day_today',
                  day_outside: 'rdp-day_outside',
                  day_disabled: 'rdp-day_disabled',
                  caption_label: 'rdp-caption_label',
                  nav_button: 'rdp-nav_button',
                  head_cell: 'rdp-head_cell',
                  cell: 'rdp-cell',
                }}
                modifiers={{
                  today: new Date(),
                }}
                modifiersStyles={{
                  selected: {
                    backgroundColor: '#10b981',
                    color: 'white',
                  },
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
                disabled={!selectedDate || !selectedTime}
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
  place_id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func,
};

export default PlaceDetailPage;
