import api from "./axios";

export const dashboardService = {
    getScheduledTopups: (type) => {
        return api.get("/dashboard/scheduled-topups", {
            params: {
                type: type
            }
        });
    },

    getLatestAccountCreation: () => {
        return api.get("/dashboard/recent-activities");
    }
};