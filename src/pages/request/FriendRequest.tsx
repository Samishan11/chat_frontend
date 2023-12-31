import { useEffect, useState } from "react";
import { useListRequest } from "../../service/request";

const FriendRequest = ({ user, auth, socket }: any) => {
  const acceptRequest = (requestBy: any) => {
    if (!socket || !auth || !user) return;
    const data = {
      requestBy,
      requestTo: auth._id,
    };
    socket.emit("accept-request", data);
  };

  const [request, setRequest] = useState<any[]>([]);

  const { data } = useListRequest(auth?._id);

  useEffect(() => {
    if (!data) return;
    setRequest(data);
  }, [data]);

  useEffect(() => {
    if (socket) {
      const handleReuqest = (data: any) => {
        setRequest(data);
      };
      socket.on("list-request", handleReuqest);

      return () => {
        socket.off("list-request", handleReuqest);
      };
    }
  }, [socket]);

  return (
    <div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-screen overflow-y-auto">
        {request?.map((user: any, ind: number) => {
          return (
            <button
              key={ind}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div className="flex relative items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {user?.requestBy?.fullname?.slice(0, 1)}
              </div>
              <div className="ml-2 text-sm font-semibold">
                {user?.requestBy?.fullname}
              </div>
              <button
                onClick={() => acceptRequest(user.requestBy?._id)}
                className="ml-2 text-sm rounded px-2 py-1 text-gray-50 bg-blue-400 font-semibold"
              >
                Accept
              </button>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequest;
