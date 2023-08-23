import { FC } from "react";

type IProp = {
  notification: any;
};
const Notification: FC<IProp> = ({ notification }) => {
  return (
    <div className="absolute transition-all top-12 rounded-sm bg-gray-300 z-50 h-72 overflow-y-scroll w-64">
      <ul className="p-2">
        {notification?.length > 0 &&
          notification?.map((data: any, ind: number) => (
            <li
              key={ind}
              className="flex justify-evenly border-b-2 mb-3 border-white"
            >
              <img
                className="object-cover flex mx-1 items-center justify-center h-8 w-8 rounded-full text-gray-50 bg-indigo-500 flex-shrink-0"
                src={`${"https://i.pinimg.com/236x/7b/36/25/7b362592ffae14729b092324d08086a5.jpg"}`}
                alt="user image"
              />
              <span className="text-xs mb-3 text-black font-med">
                {data?.notification}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Notification;
