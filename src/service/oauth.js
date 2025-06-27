import api from './api';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || 'http://localhost:5173/oauth/kakao/callback';

class OAuthService {
  // 카카오 로그인 URL 생성
  getKakaoLoginURL() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  }

  // 카카오 로그인 처리 (GET 방식, code만 전송)
  async handleKakaoCallback(code) {
    try {
      console.log('카카오 콜백 처리 시작 - 인가 코드:', code);
      
      // GET 방식으로 code를 쿼리 파라미터로 전송
      const apiEndpoint = `http://localhost/api/v1/users/kakao/callback?code=${encodeURIComponent(code)}`;
      
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('서버 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('서버 에러 응답:', errorText);
        throw new Error(`서버 에러: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('로그인 성공 데이터:', data);

      // 토큰과 사용자 정보 저장
      if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        console.log('토큰 저장 완료:', data.token);
      }

      if (data.user) {
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        console.log('사용자 정보 저장 완료:', data.user);
      }

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
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
      // API 호출이 실패해도 로컬 토큰은 삭제
    } finally {
      // 항상 로컬 토큰 삭제
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userInfo');
    }
  }

  // 토큰 검증 (조건부로만 실행)
  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      // 토큰 검증 실패 시 로컬 토큰 삭제
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userInfo');
      throw error;
    }
  }

  // 토큰이 있는지 확인
  hasValidToken() {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }
}

export const oauthService = new OAuthService();