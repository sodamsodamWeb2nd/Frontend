import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.css';

function MyPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      navigate('/login');
      return;
    }
    setUserInfo(JSON.parse(storedUserInfo));
  }, [navigate]);

  if (!userInfo) {
    return null;
  }

  const getInitials = nickname => {
    return nickname ? nickname.charAt(0).toUpperCase() : '?';
  };

  const handleEditProfile = () => {
    console.log('프로필 편집');
  };

  return (
    <div className="my-page">
      <div className="my-page-profile">
        <div className="my-page-profile-image">
          {userInfo.profileImage ? (
            <img src={userInfo.profileImage} alt="프로필" />
          ) : (
            getInitials(userInfo.nickname)
          )}
        </div>
        <span>{userInfo.nickname || '사용자 이름'}</span>
        <div className="my-page-profile-edit">
          <button onClick={handleEditProfile} title="프로필 편집">
            ✎
          </button>
        </div>
      </div>
      <ul className="my-page-list">
        <li className="my-page-list-item">
          <span>나의 리뷰</span>
        </li>
        <li className="my-page-list-item">
          <span>탈퇴하기</span>
        </li>
      </ul>
    </div>
  );
}

export default MyPage;
