import api from "./axios";

export const courseService = {
    async getProviders() {
        try {
            const url = "providers";
            const res = await api.get(url);
            return res;
        } catch (error) {
            console.log(error);
            throw {
                source: "API",
                message: error.response?.data?.message || "API get providers failed",
                status: error.response?.status,
                raw: error,
            };
        }
    },

    async getListCourses(params) {
        try {
            const url = "courses";
            const res = await api.get(url, { params });
            return res;
        } catch (error) {
            console.log(error);
            throw {
                source: "API",
                message: error.response?.data?.message || "API get list courses failed",
                status: error.response?.status,
                raw: error,
            };
        }
    },

    async getCourseById(id) {
        try {
            const url = `courses/${id}`;
            const res = await api.get(url);
            return res;
        } catch (error) {
            console.log(error);
            throw {
                source: "API",
                message: error.response?.data?.message || "API get course by id failed",
                status: error.response?.status,
                raw: error,
            };
        }
    },

    async createCourse(data) {
        try {
            const url = "courses";
            const res = await api.post(url, data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw {
                source: "API",
                message: error.response?.data?.message || "API create course failed",
                status: error.response?.status,
                raw: error,
            };
        }
    },

    async updateCourse(id, data) {
        try {
            const url = `courses/${id}`;
            const res = await api.put(url, data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw {
                source: "API",
                message: error.response?.data?.message || "API update course failed",
                status: error.response?.status,
                raw: error,
            };
        }
    }
};
