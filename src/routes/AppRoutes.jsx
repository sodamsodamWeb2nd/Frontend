import { Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/common/Footer';
import MainLayout from '../components/layout/MainLayout';
import MapPage from '../pages/MapPage';
import MainPage from '../pages/MainPage';
import ReviewPage from '../pages/ReviewPage';
import WishlistPage from '../pages/WishlistPage';
import ReservationPage from '../pages/ReservationPage';
import MyPage from '../pages/MyPage';

const AppRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MapPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="reservation" element={<ReservationPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="mypage" element={<MyPage />} />
      </Route>
    </Routes>
    <Footer />
  </>
);

export default AppRoutes;
