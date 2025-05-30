import api from './api';

class ReservationService {
  // 예약 목록 조회
  async getReservations() {
    try {
      const response = await api.get('/reservations');
      return response.data;
    } catch (error) {
      console.error('예약 목록 조회 실패:', error);
      throw error;
    }
  }

  // 예약 생성
  async createReservation(reservationData) {
    try {
      const response = await api.post('/reservations', reservationData);
      return response.data;
    } catch (error) {
      console.error('예약 생성 실패:', error);
      throw error;
    }
  }

  // 예약 취소
  async cancelReservation(reservationId) {
    try {
      const response = await api.delete(`/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('예약 취소 실패:', error);
      throw error;
    }
  }

  // 예약 상세 정보 조회
  async getReservationDetail(reservationId) {
    try {
      const response = await api.get(`/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('예약 상세 정보 조회 실패:', error);
      throw error;
    }
  }

  // 예약 가능한 날짜 조회
  async getAvailableTime(placeId, date) {
    try {
      const response = await api.get(`/reservations/available-time`, {
        params: { placeId, date },
      });
      return response.data;
    } catch (error) {
      console.error('예약 가능 날짜 조회 실패:', error);
      throw error;
    }
  }
}

export const reservationService = new ReservationService();
