import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(location.state?.error || '');

  const handleKakaoLogin = async () => {
    try {
      const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
      const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

      if (!KAKAO_CLIENT_ID || !REDIRECT_URI) {
        setError('카카오 로그인 설정이 올바르지 않습니다.');
        return;
      }

      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoURL;
    } catch (error) {
      console.error('카카오 로그인 초기화 중 오류:', error);
      setError('카카오 로그인을 시작할 수 없습니다.');
    }
  };

  // 이미 로그인된 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const from = location.state?.from?.pathname || '/main';
      navigate(from, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="login-page">
      {error && <div className="error-banner">{error}</div>}
      <div className="login-message">
        <h2>로그인 후 예약과</h2>
        <h2>리뷰를 남겨보세요</h2>
        <button
          className="kakao-btn kakao-login-btn"
          onClick={handleKakaoLogin}
        >
          카카오로 시작하기
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
