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
        {user?.length > 0 &&
          user?.map((user: any, ind: number) => {
            return (
              <button
                key={ind}
                className="flex flex-row items-center mb-2 bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
              >
                <div
                  onClick={() => sendRequest(user._id)}
                  className="flex relative items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                >
                  +
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {user.fullname}
                </div>
              </button>
            );
          })}
        {user?.length === 0 && <p>No User Found</p>}
      </div>
    </div>
  );
};

export default ListUser;
