
import api from "./axios";

export const accountService = {
  async getListAccount(params) {
    try {

      const url = "account-holders";
      const res = await api.get(url,{params});
      return res;
    } catch (error) {
      console.log(error);
      throw {
        source: "API",
        message: error.response?.data?.message || "API getAll account failed",
        status: error.response?.status,
        raw: error,
      };
    }
  },

  async getAccountById(id) {
    try {
      const url = `account-holders/${id}`;
      const res = await api.get(url);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        source: "API",
        message:
          error.response?.data?.message || "API get account by id failed",
        status: error.response?.status,
        raw: error,
      };
    }
  },

  async getAccountByResident(id) {
    try {
      const url = `account-holders/resident-info?nric=${id}`;
      const res = await api.get(url);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        source: "API",
        message:
          error.response?.data?.message || "API  account by resident failed",
        status: error.response?.status,
        raw: error,
      };
    }
  },

  async addNewAccount(params) {
    try {
      const data = {
        nric: params.nric,
        fullName: params.fullName,
        dateOfBirth: params.dateOfBirth,
        email: params.email,
        contactNumber: params.contactNumber,
        educationLevel: params.educationLevel,
        registeredAddress: params.registeredAddress,
        mailingAddress: params.mailingAddress,
        residentialStatus: params.residentialStatus,
      };
      const url = `account-holders`;
      const res = await api.post(url, data);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        source: "API",
        message:
          error.response?.data?.message || "API  add new account failed",
        status: error.response?.status,
        raw: error,
      };
    }
  },
};
