import React, { useState } from 'react';
import '../styles/CardLayout.css';

function ReviewPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isReviewed: false,
      isWriting: false,
    },
    {
      id: 2,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isReviewed: false,
      isWriting: false,
    },
  ]);

  const handleWriteClick = id => {
    setReviews(
      reviews.map(review =>
        review.id === id ? { ...review, isWriting: true } : review,
      ),
    );
  };

  const handleSubmitReview = id => {
    // 여기에 실제 리뷰 등록 API 호출 로직 추가
    console.log('리뷰 등록:', id);
    setReviews(
      reviews.map(review =>
        review.id === id
          ? { ...review, isReviewed: true, isWriting: false }
          : review,
      ),
    );
  };

  const handleCancelWrite = id => {
    setReviews(
      reviews.map(review =>
        review.id === id ? { ...review, isWriting: false } : review,
      ),
    );
  };

  return (
    <div className="card-page">
      <div className="card-list">
        {reviews.map(review => (
          <div key={review.id} className="card-item">
            <div className="card-main">
              <div className="card-content">
                <div className="card-info">
                  <h3 className="card-title">{review.storeName}</h3>
                  <p className="card-date">{review.date}</p>
                  <p className="card-description">{review.address}</p>
                </div>
                <div className="card-image">
                  {review.imageUrl ? (
                    <img src={review.imageUrl} alt={review.storeName} />
                  ) : (
                    <div className="image-placeholder" />
                  )}
                </div>
              </div>
            </div>
            <div className="card-button-wrapper">
              {review.isReviewed ? (
                <button className="card-button" disabled>
                  작성 완료
                </button>
              ) : !review.isWriting ? (
                <button
                  className="card-button"
                  onClick={() => handleWriteClick(review.id)}
                >
                  리뷰 작성
                </button>
              ) : (
                <div className="button-group">
                  <button
                    className="card-button cancel"
                    onClick={() => handleCancelWrite(review.id)}
                  >
                    취소
                  </button>
                  <button
                    className="card-button confirm"
                    onClick={() => handleSubmitReview(review.id)}
                  >
                    등록하기
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

export default ReviewPage;
