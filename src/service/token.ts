export const setToken = (data: any) => {
  return localStorage.setItem("token", JSON.stringify(data));
};
export const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem("token"));
  } catch (error) {
    console.log(error);
  }
};
