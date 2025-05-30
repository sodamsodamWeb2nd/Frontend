import api from './api';

class UserService {
  // 사용자 정보 조회
  async getUserInfo() {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
    }
  }

  // 사용자 정보 수정
  async updateUserInfo(userData) {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (key === 'profileImage' && userData[key] instanceof File) {
          formData.append('profileImage', userData[key]);
        } else {
          formData.append(key, userData[key]);
        }
      });

      const response = await api.put('/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('사용자 정보 수정 실패:', error);
      throw error;
    }
  }

  // 비밀번호 변경
  async changePassword(passwordData) {
    try {
      const response = await api.put('/users/me/password', passwordData);
      return response.data;
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      throw error;
    }
  }

  // 회원 탈퇴
  async deleteAccount() {
    try {
      const response = await api.delete('/users/me');
      return response.data;
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
