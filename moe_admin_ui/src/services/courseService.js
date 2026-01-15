import api from "./axios";

export const courseService = {
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
    }
};
