import { FC } from "react";
import { BsPlus } from "react-icons/bs";
import { Socket } from "socket.io-client";
type IProps = {
  user: any;
  auth: any;
  socket: Socket | null;
};
const ListUser: FC<IProps> = ({ user, auth, socket }) => {
  const sendRequest = (requestTo: any) => {
    console.log(socket);
    if (!socket || !auth || !user) return;
    const data = {
      requestBy: auth._id,
      requestTo,
    };
    socket.emit("send-request", data);
  };

  return (
    <div>
      <div className="flex flex-col mt-4 h-screen overflow-y-auto">
        {user?.length > 0 &&
          user?.map((user: any, ind: number) => {
            return (
              <button
                key={ind}
                className="flex flex-row items-center mb-2 bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
              >
                <div
                  onClick={() => sendRequest(user._id)}
                  className="flex relative items-center hover:scale-125 transition-all justify-center h-7 w-7 bg-indigo-200 rounded-full"
                >
                  <BsPlus />
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
