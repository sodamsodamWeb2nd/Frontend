import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { oauthService } from '../service/oauth';
import MainLayout from '../components/layout/MainLayout';
import MainPage from '../pages/MainPage';
import LikedPlacePage from '../pages/LikedPlacePage';
import ReviewPage from '../pages/ReviewPage';
import ReservationPage from '../pages/ReservationPage';
import MyPage from '../pages/MyPage';
import LoginPage from '../pages/LoginPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = oauthService.hasValidToken();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setDebugInfo('콜백 처리 시작...');
        console.log('=== 카카오 콜백 처리 시작 ===');
        console.log('현재 location:', location);
        console.log('현재 URL:', window.location.href);
        
        // URL에서 code 추출
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        
        setDebugInfo(`URL 분석 완료 - 코드: ${code ? '있음' : '없음'}`);
        
        // 에러 체크
        if (error) {
          throw new Error(`카카오 로그인 에러: ${error}`);
        }
        
        if (!code) {
          throw new Error('인가 코드가 없습니다.');
        }

        console.log('인가 코드:', code);
        setDebugInfo('서버로 GET 요청 전송 중...');

        // 백엔드로 code만 전송 (GET 방식)
        const data = await oauthService.handleKakaoCallback(code);
        
        console.log('로그인 처리 완료:', data);
        setDebugInfo('토큰 수신 완료, 페이지 이동 중...');

        if (data.token) {
          console.log('토큰 확인됨, 메인 페이지로 이동');
          
          // 토큰이 제대로 저장되었는지 확인
          const savedToken = localStorage.getItem('jwtToken');
          console.log('저장된 토큰 확인:', savedToken);
          
          if (savedToken) {
            setDebugInfo('메인 페이지로 이동...');
            // 브라우저 히스토리를 완전히 교체
            window.location.replace('/main');
          } else {
            throw new Error('토큰 저장에 실패했습니다.');
          }
        } else {
          throw new Error('서버에서 토큰을 받지 못했습니다.');
        }
      } catch (error) {
        console.error('카카오 로그인 콜백 처리 중 오류:', error);
        setError(error.message);
        setDebugInfo(`오류 발생: ${error.message}`);
        
        // 에러 발생 시 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/login', {
            replace: true,
            state: { error: error.message },
          });
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    // 컴포넌트 마운트 후 즉시 실행
    handleCallback();
  }, [navigate, location]);

  return (
    <div className="loading-container" style={{ padding: '20px' }}>
      <div className="loading-spinner"></div>
      <p>{isProcessing ? '로그인 처리 중입니다...' : '처리 완료'}</p>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>현재 상태: {debugInfo}</p>
        <p>현재 URL: {window.location.href}</p>
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <p>오류: {error}</p>
            <p>3초 후 로그인 페이지로 이동합니다...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/main" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="oauth/kakao/callback" element={<KakaoCallback />} />

      <Route
        path="main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path="likedPlace"
        element={
          <PrivateRoute>
            <LikedPlacePage />
          </PrivateRoute>
        }
      />
      <Route
        path="reservation"
        element={
          <PrivateRoute>
            <ReservationPage />
          </PrivateRoute>
        }
      />
      <Route
        path="review"
        element={
          <PrivateRoute>
            <ReviewPage />
          </PrivateRoute>
        }
      />
      <Route
        path="mypage"
        element={
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;