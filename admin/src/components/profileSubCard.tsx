import React from "react";

const ProfileSubCard = () => {
  return (
    <div className="w-full flex space-x-3 flex-wrap">
      <div className="border-2 rounded-full mb-3 border-black w-full" />
      <div className="cursor-pointer hover:-translate-x-2 border-t-2 border-l-2 border-b-[0.5rem] border-r-[0.5rem]  border-black w-fit p-2 shadow-md shadow-black transition-all">
        <div className="flex space-x-3">
          <h1>Name:</h1>
          <h3>{"Nilesh Shinde"}</h3>
        </div>
        <div className="flex space-x-3">
          <h1>Total ratings:</h1>
          <h3>{"10"}</h3>
        </div>
        <div className="flex space-x-3">
          <h1>Total comments:</h1>
          <h3>{"10"}</h3>
        </div>
      </div>
      <div className="cursor-pointer hover:-translate-x-2 border-t-2 border-l-2 border-b-[0.5rem] border-r-[0.5rem]  border-black w-fit p-2 shadow-md shadow-black transition-all">
        <div className="flex space-x-3">
          <h1>Name:</h1>
          <h3>{"Nilesh Shinde"}</h3>
        </div>
        <div className="flex space-x-3">
          <h1>Total ratings:</h1>
          <h3>{"10"}</h3>
        </div>
        <div className="flex space-x-3">
          <h1>Total comments:</h1>
          <h3>{"10"}</h3>
        </div>
      </div>
    </div>
  );
};
export default ProfileSubCard;
