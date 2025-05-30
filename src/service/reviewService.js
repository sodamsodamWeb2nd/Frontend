import api from './api';

class ReviewService {
  // 리뷰 목록 조회
  async getReviews(params) {
    try {
      const response = await api.get('/reviews', { params });
      return response.data.map(review => ({
        ...review,
        review_id: review.id,
        images: review.images?.map(img => ({
          ...img,
          image_url: img.imageUrl,
        })),
      }));
    } catch (error) {
      console.error('리뷰 목록 조회 실패:', error);
      throw error;
    }
  }

  // 리뷰 작성
  async createReview(reviewData) {
    try {
      const formData = new FormData();
      formData.append('content', reviewData.content);
      formData.append('place_id', reviewData.placeId);

      if (reviewData.images) {
        reviewData.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await api.post('/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
      throw error;
    }
  }

  // 내가 작성한 리뷰 목록 조회
  async getMyReviews() {
    try {
      const response = await api.get('/reviews/my');
      return response.data.map(review => ({
        ...review,
        review_id: review.id,
        images: review.images?.map(img => ({
          ...img,
          image_url: img.imageUrl,
        })),
      }));
    } catch (error) {
      console.error('내 리뷰 목록 조회 실패:', error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService();
