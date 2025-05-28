import React from 'react';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI =
  import.meta.env.VITE_KAKAO_REDIRECT_URI ||
  'http://localhost:3000/oauth/kakao/callback';

const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return <button onClick={handleLogin}>카카오로 로그인</button>;
};

export default KakaoLoginButton;
