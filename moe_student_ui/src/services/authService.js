import axiosClient from './axiosClient';

const authService = {
  login(data) {
    return axiosClient.post('/auth/login', data);
  },

  getProfile() {
    return axiosClient.get('/auth/me');
  }
};

export default authService;