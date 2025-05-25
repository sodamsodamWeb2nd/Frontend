import React from 'react';
import '../styles/CardLayout.css';

function ReviewPage() {
  const reviews = [
    {
      id: 1,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isReviewed: false,
    },
    {
      id: 2,
      date: '2025-05-02',
      storeName: '공주대학교 천안공과대학',
      address: '천안시 서북구 대학로 100',
      imageUrl: null,
      isReviewed: true,
    },
  ];

  const handleWriteReview = id => {
    console.log('리뷰 작성:', id);
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
                  {review.imageUrl && (
                    <img src={review.imageUrl} alt={review.storeName} />
                  )}
                </div>
              </div>
            </div>
            <div className="card-button-wrapper">
              <button
                className="card-button"
                onClick={() => handleWriteReview(review.id)}
                disabled={review.isReviewed}
              >
                {review.isReviewed ? '작성 완료' : '리뷰 작성하기'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
