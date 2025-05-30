import api from './api';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

class OAuthService {
  // 카카오 로그인 URL 생성
  getKakaoLoginURL() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  }

  // 카카오 로그인 처리
  async handleKakaoCallback(code) {
    try {
      // 백엔드 서버로 인가 코드 전송
      const response = await fetch('/api/auth/kakao/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('카카오 로그인 처리 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류:', error);
      throw error;
    }
  }

  // 로그아웃
  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('jwtToken');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    }
  }

  // 토큰 검증
  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      throw error;
    }
  }
}

export const oauthService = new OAuthService();
