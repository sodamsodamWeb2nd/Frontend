import api from './api';

class PlaceService {
  // 장소 목록 조회
  async getPlaces(params) {
    try {
      const response = await api.get('/places', { params });
      return response.data;
    } catch (error) {
      console.error('장소 목록 조회 실패:', error);
      throw error;
    }
  }

  // 장소 상세 정보 조회
  async getPlaceDetail(placeId) {
    try {
      const response = await api.get(`/places/${placeId}`);
      return response.data;
    } catch (error) {
      console.error('장소 상세 정보 조회 실패:', error);
      throw error;
    }
  }

  // 장소 찜하기/취소
  async toggleLike(placeId) {
    try {
      const response = await api.post(`/places/${placeId}/like`);
      return response.data;
    } catch (error) {
      console.error('장소 찜하기/취소 실패:', error);
      throw error;
    }
  }

  // 찜한 장소 목록 조회
  async getLikedPlaces() {
    try {
      const response = await api.get('/places/liked');
      return response.data;
    } catch (error) {
      console.error('찜한 장소 목록 조회 실패:', error);
      throw error;
    }
  }
}

export const placeService = new PlaceService();
