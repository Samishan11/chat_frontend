const ProfilePicture = () => {
  return (
    <div className="h-screen flex justify-center bg-black items-center">
      <div className="flex flex-col">
        <div className="flex justify-around item-center">
          <img
            className="object-cover mx-3 flex border-white border-2	 items-center justify-center h-28 w-28 rounded-full"
            src="https://i.pinimg.com/236x/7b/36/25/7b362592ffae14729b092324d08086a5.jpg"
            alt=""
          />
          <img
            className="object-cover mx-3 flex border-white border-2	 items-center justify-center h-28 w-28 rounded-full"
            src="https://i.pinimg.com/236x/7b/36/25/7b362592ffae14729b092324d08086a5.jpg"
            alt=""
          />
          <img
            className="object-cover mx-3 flex border-white border-2	 items-center justify-center h-28 w-28 rounded-full"
            src="https://i.pinimg.com/236x/7b/36/25/7b362592ffae14729b092324d08086a5.jpg"
            alt=""
          />
        </div>
        <button className="bg-indigo-500 mt-10 px-6 py-2 rounded-sm mx-auto">Save</button>
      </div>
    </div>
  );
};

export default ProfilePicture;
