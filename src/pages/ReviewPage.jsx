import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/CardLayout.css';
import { reviewService } from '../service/reviewService';

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getMyReviews();
      setReviews(data);
      setError(null);
    } catch (error) {
      console.error('리뷰 목록 로딩 실패:', error);
      setError('리뷰 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleWriteClick = review_id => {
    setReviews(
      reviews.map(review =>
        review.review_id === review_id
          ? { ...review, isWriting: true }
          : review,
      ),
    );
  };

  const handleSubmitReview = async review_id => {
    try {
      const reviewData = {
        placeId: review_id,
        content: reviewContent,
        images: selectedImages,
        tags: tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag),
      };
      await reviewService.createReview(reviewData);
      await fetchReviews();
      setReviewContent('');
      setSelectedImages([]);
      setTags('');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
    }
  };

  const handleCancelWrite = review_id => {
    setReviews(
      reviews.map(review =>
        review.review_id === review_id
          ? { ...review, isWriting: false }
          : review,
      ),
    );
    setReviewContent('');
    setSelectedImages([]);
    setTags('');
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
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
        {reviews.map(review => (
          <div key={review.review_id} className="card-item">
            <div className="card-main">
              <div className="card-content">
                <div className="card-info">
                  <h3 className="card-title">{review.place_name}</h3>
                  <p className="card-date">{review.created_at}</p>
                  <p className="card-description">{review.address}</p>
                </div>
                <div className="card-image">
                  {review.images?.[0]?.image_url ? (
                    <img
                      src={review.images[0].image_url}
                      alt={review.place_name}
                    />
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
                  onClick={() => handleWriteClick(review.review_id)}
                >
                  리뷰 작성
                </button>
              ) : (
                <div className="review-form">
                  <textarea
                    id="review-content"
                    name="review-content"
                    value={reviewContent}
                    onChange={e => setReviewContent(e.target.value)}
                    placeholder="리뷰를 작성해주세요"
                  />
                  <input
                    id="review-tags"
                    name="review-tags"
                    type="text"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    placeholder="태그를 입력하세요 (쉼표로 구분)"
                  />
                  <input
                    id="review-images"
                    name="review-images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="button-group">
                    <button
                      className="card-button cancel"
                      onClick={() => handleCancelWrite(review.review_id)}
                    >
                      취소
                    </button>
                    <button
                      className="card-button confirm"
                      onClick={() => handleSubmitReview(review.review_id)}
                    >
                      등록하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReviewPage.propTypes = {
  // 현재는 props가 없지만, 향후 확장성을 위해 PropTypes 정의
};

export default ReviewPage;
