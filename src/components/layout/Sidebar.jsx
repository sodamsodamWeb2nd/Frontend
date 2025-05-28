import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Outlet } from 'react-router-dom';
import '../../styles/components/MainLayout.css';
import '../../styles/components/Sidebar.css';

const menuItems = [
  { type: 'main', label: '지도 홈', path: '/main' },
  { type: 'likedPlace', label: '찜한 장소', path: '/likedPlace' },
  { type: 'reservation', label: '나의 예약', path: '/reservation' },
  { type: 'review', label: '리뷰 작성', path: '/review' },
  { type: 'mypage', label: '내 프로필', path: '/mypage' },
];

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Sidebar({ onPlaceSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__main">
        <nav className="menu">
          {menuItems.map(({ type, label, path }) => {
            const capitalizedType = capitalizeFirstLetter(type);
            return (
              <NavLink
                key={type}
                to={path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? 'active' : ''}`
                }
              >
                {({ isActive }) => {
                  const imgSrc = isActive
                    ? `/img/menuOn/${capitalizedType}On.png`
                    : `/img/menu/${capitalizedType}.png`;

                  return (
                    <div className="menu-icon-wrapper">
                      <img src={imgSrc} alt={label} className="menu-icon" />
                      <span className="menu-label">{label}</span>
                    </div>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar__content custom-scrollbar">
          <Outlet context={{ onPlaceSelect }} />
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  onPlaceSelect: PropTypes.func.isRequired,
};

export default Sidebar;
