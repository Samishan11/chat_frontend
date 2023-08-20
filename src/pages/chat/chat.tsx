import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import { useForm } from "react-hook-form";
import { useSocket } from "../../context/socket";
import { getToken } from "../../service/token";
import { useRoomQuery } from "../../service/room";

const Chat = () => {
  const socket = useSocket();
  const auth = getToken();

  const [data, setData] = useState();
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);

  const { register, watch, reset } = useForm();
  const users = [auth?._id, data?._id];
  const { data: _room, isLoading } = useRoomQuery(users);
  useEffect(() => {
    if (isLoading) return;
    setRoom(_room?._id);
  }, [isLoading, _room]);

  const handleUser = (data) => {
    setData(data);
  };

  useEffect(() => {
    if (room) {
      console.log(room);
      socket.emit("join_room", room);
    }
  }, [room]);

  const sendMessage = () => {
    const chat = watch().message;
    const chatData = {
      message: chat,
      messageBy: auth._id,
      messageTo: data._id,
    };
    if (!room) {
      socket.emit("chat", {
        data: chatData,
      });
    } else {
      socket.emit("chat", {
        data: { ...chatData, roomId: room },
      });
    }

    reset("");
    setMessages((prev) => [...prev, chatData]);
  };

  useEffect(() => {
    if (!socket) return;
    socket.off("message").on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <Sidebar click={handleUser} />
          <div className="flex  flex-col flex-auto h-full p-6">
            {data ? (
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {/*  right chat */}
                      {messages?.map((chat: any, ind: number) => (
                        <div
                          key={ind}
                          className={`${
                            chat?.messageBy === auth?._id
                              ? "col-start-6 col-end-13 p-3 rounded-lg flex justify-end" // Align to the right
                              : "col-start-1 col-end-8 p-3 rounded-lg flex justify-start" // Align to the left
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="flex mx-1 items-center justify-center h-10 w-10 rounded-full text-gray-50 bg-indigo-500 flex-shrink-0">
                              {chat?.messageBy === auth?._id
                                ? auth.username.slice(0, 1).toUpperCase()
                                : data?.username.slice(0, 1).toUpperCase()}
                            </div>
                            <div
                              className={`relative mr-3 text-sm py-2 px-4 shadow rounded-xl ${
                                chat?.messageBy === auth?._id
                                  ? "bg-indigo-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <div className="">{chat.message}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="message"
                        {...register("message")}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={sendMessage}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <h3 className="text-xl font-semibold">Start Conversation</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
