import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Chat from "../pages/chat/chat";
import { SocketContext } from "../context/socket";
// import io from "socket.io-client";
import io, { Socket } from "socket.io-client";
import { getToken } from "../service/token";
import ProfilePicture from "../pages/profile/ProfilePicture";
import { AuthContext } from "../context/auth.context";
const AppRoute = () => {
  const user: any = getToken();

  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [authData, setAuthData] = React.useState<any>();
  React.useEffect(() => {
    if (!user?._id) return;
    const socket: Socket = io("https://chat-backend-zlsm.vercel.app", {
      query: {
        userId: user?._id,
      },
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  let token: string = "";
  try {
    token = JSON.parse(localStorage?.getItem("token") ?? "");
  } catch (error: any) {
    console.log(error.message);
  }

  React.useEffect(() => {
    try {
      if (!token) return;
      setAuthData(token);
    } catch (error: any) {
      console.log(error?.message);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      <SocketContext.Provider value={{ socket }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<ProfilePicture />} />
        </Routes>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppRoute;
