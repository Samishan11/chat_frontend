import toast from "react-hot-toast";

const Toast = ({ type, message }: any) => {
  return type === "success"
    ? toast.success(message)
    : type === "error"
    ? toast.success(message)
    : "";
};

export default Toast;
