import React from "react";

const ListUser = ({ user, auth, socket }) => {
  const sendRequest = (requestTo) => {
    if (!socket || !auth || !user) return;
    const data = {
      requestBy: auth._id,
      requestTo,
    };
    socket.emit("send-request", data);
  };
  return (
    <div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-screen overflow-y-auto">
        {user?.map((user: any, ind: number) => {
          return (
            <button
              key={ind}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                onClick={() => sendRequest(user._id)}
                className="flex relative items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                +
              </div>
              <div className="ml-2 text-sm font-semibold">{user.fullname}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ListUser;
