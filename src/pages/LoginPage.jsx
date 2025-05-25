import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    rememberMe: false,
  });
  const [idError, setIdError] = useState('');

  const validateId = value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(01[016789])-?(\d{3,4})-?(\d{4})$/;

    if (!value) {
      setIdError('아이디를 입력해주세요');
      return false;
    }
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      setIdError('이메일 또는 전화번호 형식이 올바르지 않습니다');
      return false;
    }
    setIdError('');
    return true;
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: inputValue,
    }));

    if (name === 'loginId' && value) {
      validateId(value);
    }
  };

  const handleLogin = event => {
    event.preventDefault();

    if (!validateId(formData.loginId)) {
      return;
    }

    // 백엔드 API 호출로 대체해야 하는 부분 
    const tempToken = 'temp_jwt_token_' + Date.now();
    localStorage.setItem('jwtToken', tempToken);
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: 'temp_id',
        nickname: '게스트',
        email: formData.loginId,
        profileImage: '',
      }),
    );

    if (formData.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }

    const from = location.state?.from?.pathname || '/main';
    navigate(from);
  };

  const handleKakaoButtonClick = () => {
    setIsLoginForm(true);
  };

  return (
    <div className="login-page">
      {!isLoginForm ? (
        <div className="login-message">
          <h2>로그인 후 예약과</h2>
          <h2>리뷰를 남겨보세요</h2>
          <button
            className="kakao-btn kakao-login-btn"
            onClick={handleKakaoButtonClick}
          >
            카카오로 시작하기
          </button>
        </div>
      ) : (
        <div className="kakao-login-form">
          <div className="kakao-logo">kakao</div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                name="loginId"
                value={formData.loginId}
                onChange={handleInputChange}
                placeholder="카카오계정 (이메일 또는 전화번호)"
                required
              />
              {idError && <div className="error-message">{idError}</div>}
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호"
              required
            />
            <div className="login-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />{' '}
                로그인 상태 유지
              </label>
            </div>
            <button type="submit" className="kakao-btn kakao-submit-btn">
              로그인
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
