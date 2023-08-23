import jwtDecode from "jwt-decode";
export const setToken = (data: any) => {
  return localStorage.setItem("token", JSON.stringify(data));
};

export const token = JSON.parse(localStorage.getItem("token"));

export const getToken = () => {
  try {
    const decode = jwtDecode(token);
    return decode.data;
  } catch (error) {
    console.log(error);
  }
};
