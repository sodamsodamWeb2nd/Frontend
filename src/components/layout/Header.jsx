import React from 'react';
import '../../styles/components/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/img/SodamSodam.png" alt="소담소담 로고" />
      </div>
      <div className="header__center">
        <div className="search-wrapper">
          <input
            type="text"
            className="header__search"
            placeholder="장소, 주소 등 검색"
          />
          <img src="/img/Search.png" alt="검색" className="search-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
