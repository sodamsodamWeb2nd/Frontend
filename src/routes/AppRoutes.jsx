import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { oauthService } from '../service/oauth';
import MainLayout from '../components/layout/MainLayout';
import MainPage from '../pages/MainPage';
import LikedPlacePage from '../pages/LikedPlacePage';
import ReviewPage from '../pages/ReviewPage';
import ReservationPage from '../pages/ReservationPage';
import MyPage from '../pages/MyPage';
import LoginPage from '../pages/LoginPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwtToken') !== null;
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      if (isAuthenticated) {
        try {
          await oauthService.verifyToken();
        } catch (error) {
          localStorage.removeItem('jwtToken');
          window.location.href = '/login';
        }
      }
    };
    verifyToken();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = new URLSearchParams(location.search).get('code');
        if (!code) {
          throw new Error('인가 코드가 없습니다.');
        }

        const data = await oauthService.handleKakaoCallback(code);
        if (data.token) {
          localStorage.setItem('jwtToken', data.token);
          if (data.user) {
            localStorage.setItem('userInfo', JSON.stringify(data.user));
          }
          navigate('/main', { replace: true });
        }
      } catch (error) {
        console.error('카카오 로그인 콜백 처리 중 오류:', error);
        navigate('/login', {
          replace: true,
          state: { error: '로그인 처리 중 오류가 발생했습니다.' },
        });
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>로그인 처리 중입니다...</p>
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/main" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="oauth/callback/kakao" element={<KakaoCallback />} />

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
