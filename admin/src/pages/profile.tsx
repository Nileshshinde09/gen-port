import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const username = "striver";
  const isAdmin = true;
  return (
    <div>
      hello world
    </div>
  );
};

export default Profile;
