import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Chat from "../pages/chat/chat";
import { SocketContext } from "../context/socket";
import io from "socket.io-client";
import { getToken } from "../service/token";
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
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </SocketContext.Provider>
  );
};

export default AppRoute;
