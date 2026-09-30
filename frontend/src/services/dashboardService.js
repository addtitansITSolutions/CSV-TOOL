import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/history", {
    params: {
      page: 1,
      limit: 5,
    },
  });

  return response.data;
};