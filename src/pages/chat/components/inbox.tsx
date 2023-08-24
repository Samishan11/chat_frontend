import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../context/socket";
import { getToken } from "../../../service/token";
import { useForm } from "react-hook-form";
import { useListChat } from "../../../service/chat";
import moment from "moment";
import { useScrollToBottom } from "../../../hooks/useScrollToBottom";
import { BsImageFill } from "react-icons/bs";
const Indbox = ({ data }: any) => {
  const socket = useSocket();
  const auth: any = getToken();

  const imageRef = useRef();

  //  states
  //  data requestBy , requestTo , roomId
  // const [emoji, setEmoji] = useState<any[]>([]);
  const [messages, setMessages] = useState([]);
  const { register, watch, reset } = useForm();
  const [image, setImage] = useState();

  //  react query
  const { data: chat, isLoading: isLoadingChat } = useListChat(data?.roomId);

  const ref = useRef<HTMLDivElement>(null);

  // set chat list
  useEffect(() => {
    if (isLoadingChat) return;
    setMessages(chat);
  }, [isLoadingChat, chat]);

  // event join room
  useEffect(() => {
    if (!data) return;
    socket.emit("join_room", data.roomId);
  }, [data, socket]);

  // send message
  const sendMessage = () => {
    if (!data.roomId) return;
    const chat = watch().message;
    const chatData = {
      message: chat,
      image: image ?? "",
      messageBy: auth?._id,
      messageTo:
        auth._id === data?.requestBy?._id
          ? data?.requestTo?._id
          : data?.requestBy?._id,
      roomId: data?.roomId,
    };

    socket.emit("chat", {
      data: chatData,
    });
    reset({ message: "" });
    setMessages((prev) => [...prev, chatData]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  //  get messsage
  useEffect(() => {
    if (!socket) return;
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  useScrollToBottom({ ref, messages });

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  console.log(image);
  console.log(messages);

  return (
    <div className="flex flex-col flex-auto h-[96%] mt-10 p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        {!messages && <span>loding...</span>}
        {chat && messages?.length > 0 ? (
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
                    <div className="flex items-start">
                      <div className="flex mx-1 items-center justify-center h-10 w-10 rounded-full text-gray-50 bg-indigo-500 flex-shrink-0">
                        <img
                          className="object-cover flex mx-1 items-center justify-center h-10 w-10 rounded-full text-gray-50 bg-indigo-500 flex-shrink-0"
                          src={`${
                            chat?.messageBy === auth?._id
                              ? "https://i.pinimg.com/236x/7b/36/25/7b362592ffae14729b092324d08086a5.jpg"
                              : "https://img.freepik.com/premium-photo/anime-boy-dreaming_977580-209.jpg?size=626&ext=jpg&ga=GA1.1.238575628.1692703378&semt=ais"
                          }`}
                          alt=""
                        />
                      </div>
                      <div className=" text-xs text-indigo-500 font-semibold">
                        {data?.requestTo?._id === chat?.messageBy
                          ? data?.requestTo?.username
                          : data?.requestBy?.username}
                        <span className="mx-1">
                          {moment(chat?.createdAt).format("hh:mm")}
                        </span>
                        {chat?.image && (
                          <img
                            src={
                              chat?.image?.name
                                ? URL.createObjectURL(chat?.image)
                                : `http://localhost:5000/uploaded_images/${chat?.image}`
                            }
                            alt="image"
                          />
                        )}
                        {chat?.message?.length > 0 && (
                          <div
                            className={`relative mr-3 mt-1 text-sm py-2 px-4 shadow rounded-xl ${
                              chat?.messageBy === auth?._id
                                ? "bg-indigo-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {chat?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={ref} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h3 className="text-xl font-semibold">Start Conversation</h3>
          </div>
        )}

        <div className="flex items-center">
          <BsImageFill
            onClick={() => imageRef.current.click()}
            className="text-indigo-500 text-lg"
          />
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              {/* <InputEmoji
                    name="message"
                    {...register("message")}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                  /> */}
              <input
                type="text"
                name="message"
                {...register("message")}
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              />
              <input
                onChange={handleImageChange}
                ref={imageRef}
                id="image"
                type="file"
                className="hidden"
              />
              <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                <svg
                  onClick={() => setOpneEmoji(!openEmoji)}
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
              onKeyDown={handleKeyDown}
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
    </div>
  );
};

export default Indbox;
