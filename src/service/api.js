import axios from 'axios';

// 기본 API 설정
const API_BASE_URL = 'http://localhost/api/v1/'; // 실제 API 서버 주소로 변경 필요

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (JWT 토큰 자동 추가)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  response => response,
  error => {
    // 로그인 요청이 아닌 경우에만 401 에러 처리
    if (error.response?.status === 401 && !isLoginRequest(error.config)) {
      // 토큰 만료 시 로그인 페이지로 리다이렉트
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userInfo');
      
      // 현재 페이지가 로그인 페이지가 아닌 경우에만 리다이렉트
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// 로그인 요청인지 확인하는 함수
function isLoginRequest(config) {
  return config.url && (
    config.url.includes('/auth/kakao/callback') ||
    config.url.includes('/users/kakao/callback') ||
    config.url.includes('/auth/login') ||
    config.url.includes('/auth/verify')
  );
}

export default api;