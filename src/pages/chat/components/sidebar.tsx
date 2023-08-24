import React, { useEffect, useMemo, useState } from "react";
import { useUserQuery } from "../../../service/auth";
import { getToken } from "../../../service/token";
import { useSocket } from "../../../context/socket";
import ListUser from "../../user/ListUser";
import FriendRequest from "../../request/FriendRequest";
import { useListFriend } from "../../../service/request";

const Sidebar = ({ click }: any) => {
  const { data } = useUserQuery();
  const auth = getToken();
  const { data: friend, isLoading: isLoadingFriend } = useListFriend(auth?._id);
  const socket = useSocket();

  const [isOnline, setIsOnline] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", (onlineUsers) => {
        setIsOnline(onlineUsers);
      });
      return () => {
        socket.off("onlineUsers");
      };
    }
  }, [socket]);

  const [tab, setTab] = useState("active");

  const filter = useMemo(() => {
    if (!data) return [];
    return data.filter((x) => x._id !== auth._id);
  }, [data, auth._id]);

  const handelTabs = (tab: string) => {
    if (tab) {
      setTab(tab);
    }
  };

  return (
    <div className="flex z-50 flex-col py-8 pl-6 pr-2 w-64 bg-indigo-500 border-r-2 rounded-sm flex-shrink-0  border-indigo-200">
      <div className="fixed">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">QuickChat</div>
        </div>
        <div className="flex flex-col mt-8 h-full ">
          <div className="flex flex-row text-white items-center justify-between text-xs">
            <span
              onClick={() => handelTabs("active")}
              className=" cursor-pointer font-bold"
            >
              Active
            </span>
            <span
              onClick={() => handelTabs("user")}
              className=" cursor-pointer font-bold"
            >
              User
            </span>
            <span
              onClick={() => handelTabs("request")}
              className=" cursor-pointer font-bold"
            >
              Request
            </span>
          </div>
          {isLoadingFriend && <p>Loading...</p>}
          {tab === "active" && (
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-screen overflow-y-auto">
              {!isLoadingFriend &&
                friend?.length > 0 &&
                friend?.map((user: any, ind: number) => {
                  return (
                    <button
                      key={ind}
                      onClick={() => click(user)}
                      className="flex flex-row items-center mb-2 bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
                    >
                      <div className="flex relative items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        {user?.requestBy?._id === auth?._id
                          ? user?.requestTo?.fullname?.slice(0, 1).toUpperCase()
                          : user?.requestBy?.fullname
                              ?.slice(0, 1)
                              .toUpperCase()}
                        {isOnline?.length > 0 &&
                          isOnline?.includes(
                            user?.requestBy?._id === auth?._id
                              ? user?.requestTo?._id
                              : user?.requestBy?._id
                          ) && (
                            <span className="h-2 w-2 absolute right-0 top-0 rounded bg-green-600"></span>
                          )}
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {user?.requestBy?._id === auth?._id
                          ? user?.requestTo?.fullname
                          : user?.requestBy?.fullname}
                      </div>
                    </button>
                  );
                })}
              {friend?.length === 0 && (
                <p className="text-white text-sm">
                  You don't have any friends yet.
                </p>
              )}
            </div>
          )}
          {tab === "user" && (
            <ListUser
              isOnline={isOnline}
              socket={socket}
              auth={auth}
              user={filter}
            />
          )}
          {tab === "request" && (
            <FriendRequest socket={socket} auth={auth} user={filter} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
