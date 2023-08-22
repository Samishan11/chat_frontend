import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Indbox from "./components/indbox";

const Chat = () => {
  const [openchat, setopenchat] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  //  method set receiver info
  const handleUser = (data) => {
    if (!data) return;
    setopenchat(true);
    setData(data);
  };

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <Sidebar click={handleUser} />
          {openchat ? (
            <Indbox data={data} />
          ) : (
            <div className="flex justify-center items-center flex-col flex-auto h-screen p-6">
              <h3 className="text-xl font-semibold">Start Conversation</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
