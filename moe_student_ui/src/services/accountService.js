import axiosClient from './axiosClient';

const accountService = {
  getMyProfile() {
    return axiosClient.get('/account-holders/me');
  },

  updateProfile(data) {
    return axiosClient.put('/account-holders/me', data);
  },

  getActiveCourses(accountHolderId) {
    return axiosClient.get(`/account-holders/${accountHolderId}/active-courses`);
  },

  // Lấy số dư tài khoản
  getBalance(accountId) {
    return axiosClient.get(`/education-accounts/${accountId}/balance`);
  },

  // Lấy phí chưa thanh toán
  getOutstandingFees(accountId) {
    return axiosClient.get(`/education-accounts/${accountId}/outstanding-fees`);
  }
};

export default accountService;