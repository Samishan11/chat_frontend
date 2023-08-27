import { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import Notification from "./Notification";
import { useSocket } from "../context/socket";
import {
  useClearNotification,
  useListNotification,
} from "../service/notification/notification";
import { getToken } from "../service/token";

const Navbar = () => {
  const { socket } = useSocket();
  const auth = getToken();
  //  state hook
  const [open, setOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  //  react query
  const { data } = useListNotification(auth?._id);
  const clear = useClearNotification();

  // effect hooks
  useEffect(() => {
    if (!data) return;
    setNotification(data?.data);
    setCount(data?.count);
  }, [data]);

  useEffect(() => {
    if (socket) {
      const handleNotification = (notiData: any) => {
        console.log(notiData);
        setNotification((prev) => [...prev, notiData]);
        setCount(count + 1);
      };

      socket.on("get-notification", handleNotification);

      return () => {
        socket.off("get-notification", handleNotification);
      };
    }
  }, [socket, count]);

  //  methods
  const handleClearNotification = (data: number[]) => {
    clear.mutate(data);
  };

  const notificationId = notification?.map(
    (data: { _id: number }) => data?._id
  );

  const handleClick = () => {
    setOpen(!open);
    handleClearNotification(notificationId);
  };

  return (
    <div className="w-screen absolute top-0 left-0 h-14 bg-indigo-500">
      <div
        onClick={handleClick}
        className="flex relative justify-end items-center h-14 px-4 text-white"
      >
        <span className="absolute text-xs bottom-auto left-auto bg-red-500 h-5 w-5 overflow-hidden rounded-full z-10 flex justify-center items-center top-1 right-1">
          {count}
        </span>
        <BsFillBellFill />
        {open && <Notification notification={notification} />}
      </div>
    </div>
  );
};

export default Navbar;
