import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Chat from "../pages/chat/chat";
import { SocketContext } from "../context/socket";
import io from "socket.io-client";
import { getToken } from "../service/token";
import ProfilePicture from "../pages/profile/ProfilePicture";
const AppRoute = () => {
  const user: any = getToken();

  const [socket, setSocket] = React.useState();

  React.useEffect(() => {
    if (!user) return;
    const newSocket = io.connect("http://localhost:5000", {
      query: {
        userId: user?._id,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfilePicture />} />
      </Routes>
    </SocketContext.Provider>
  );
};

export default AppRoute;
