import toast from "react-hot-toast/headless";

const Toast = ({ type, message }: any) => {
  console.log(type, message);
  return type === "success"
    ? toast.success(message)
    : type === "error"
    ? toast.success(message)
    : "";
};

export default Toast;
