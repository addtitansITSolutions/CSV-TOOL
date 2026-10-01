import api from "./api";

export const processFile = async ({ file, percentage, method }) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("percentage", String(percentage));
  formData.append("method", method);

  const response = await api.post("/process", formData);

  return response.data;
};
