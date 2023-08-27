import { useEffect, useMemo, useState } from "react";
import { useUserQuery } from "../../../service/auth";
import { getToken } from "../../../service/token";
import { useSocket } from "../../../context/socket";
import ListUser from "../../user/ListUser";
import FriendRequest from "../../request/FriendRequest";
import { useListFriend } from "../../../service/request";
import { useAuthData } from "../../../context/auth.context";
import { BsX } from "react-icons/bs";

const Sidebar = ({ click }: any) => {
  const { authData } = useAuthData();
  const { socket } = useSocket();
  const auth = getToken(authData);
  //  states
  const [isOnline, setIsOnline] = useState<any>([]);
  const [friend, setFriend] = useState<any>([]);

  const { data } = useUserQuery();
  const { data: listFriend, isLoading: isLoadingFriend } = useListFriend(
    auth?._id
  );

  useEffect(() => {
    if (!listFriend) return;
    setFriend(listFriend);
  }, [listFriend]);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", (onlineUsers: any) => {
        setIsOnline(onlineUsers);
      });
      return () => {
        socket.off("onlineUsers");
      };
    }
  }, [socket]);

  const [tab, setTab] = useState("active");

  const filter = useMemo(() => {
    if (!data || !auth._id) return [];
    return data.filter((x: any) => x._id !== auth?._id);
  }, [data, auth?._id]);

  const handelTabs = (tab: string) => {
    if (tab) {
      setTab(tab);
    }
  };

  //  show online user only
  const onlineUser = useMemo(() => {
    if (friend?.length > 0 || isOnline?.length > 0 || auth?._id) {
      const onlineFriends = friend?.filter((friend: any) =>
        isOnline.includes(
          friend.requestBy._id === auth?._id
            ? friend.requestTo._id
            : friend.requestBy._id
        )
      );
      return onlineFriends;
    }
    return;
  }, [friend, isOnline, auth._id]);

  //  handle delete friend

  const handleDeleteFriend = (data: any) => {
    if (!data) return;
    const formatedData = {
      user: auth?._id,
      friend: data?.requestTo?._id,
      roomId: data?.roomId,
      id: data._id,
    };
    socket?.emit("remove-friend", formatedData);
  };

  useEffect(() => {
    if (socket) {
      socket.on("get-friend", (friends: any) => {
        setFriend(friends);
      });
    }
  }, [socket]);

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
              className={`${
                tab === "active"
                  ? "decoration-[1.3px] underline underline-offset-[5px] cursor-pointer font-bold"
                  : "cursor-pointer font-bold"
              } relative`}
            >
              Active
              <span className="absolute top-[-10px] rounded-full text-[.7re] bg-green-500 h-5 w-5 flex justify-center right-[-20px] items-center">
                {onlineUser?.length}
              </span>
            </span>
            <span
              onClick={() => handelTabs("user")}
              className={`${
                tab === "user"
                  ? "decoration-[1.3px] underline underline-offset-[5px] cursor-pointer font-bold"
                  : "cursor-pointer font-bold"
              }`}
            >
              User
            </span>
            <span
              onClick={() => handelTabs("request")}
              className={`${
                tab === "request"
                  ? " decoration-[1.3px] underline underline-offset-[5px] cursor-pointer font-bold"
                  : "cursor-pointer font-bold"
              }`}
            >
              Request
            </span>
          </div>
          {isLoadingFriend && <p>Loading...</p>}
          {tab === "active" && (
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-screen overflow-y-auto">
              {!isLoadingFriend &&
                onlineUser?.length > 0 &&
                onlineUser?.map((user: any, ind: number) => {
                  return (
                    <button
                      key={ind}
                      className="flex flex-row items-center justify-between mb-2 bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
                    >
                      <div
                        className="flex items-center"
                        onClick={() => click(user)}
                      >
                        <div className="flex relative items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                          {user?.requestBy?._id === auth?._id
                            ? user?.requestTo?.fullname
                                ?.slice(0, 1)
                                .toUpperCase()
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
                        <div className=" text-sm ml-3 font-semibold">
                          {user?.requestBy?._id === auth?._id
                            ? user?.requestTo?.username.toUpperCase()
                            : user?.requestBy?.username.toUpperCase()}
                        </div>
                      </div>
                      <BsX
                        onClick={() => handleDeleteFriend(user)}
                        className="text-white bg-red-500 rounded-full font-black text-xl mt-1"
                      />
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
            <ListUser socket={socket} auth={auth} user={filter} />
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
