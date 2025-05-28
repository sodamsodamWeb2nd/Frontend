import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import MainPage from '../pages/MainPage';
import LikedPlacePage from '../pages/LikedPlacePage';
import ReviewPage from '../pages/ReviewPage';
import ReservationPage from '../pages/ReservationPage';
import MyPage from '../pages/MyPage';
import LoginPage from '../pages/LoginPage';

// 로그인 상태 체크를 위한 PrivateRoute 컴포넌트
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwtToken') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    // 현재 시도한 경로를 state로 전달하여 로그인 후 해당 페이지로 리다이렉션할 수 있도록 함
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* 로그인하지 않은 사용자를 위한 루트 페이지는 로그인 페이지 */}
        <Route index element={<LoginPage />} />

        {/* 로그인이 필요한 페이지들 */}
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

        {/* 로그인 페이지는 누구나 접근 가능 */}
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  </>
);

export default AppRoutes;
