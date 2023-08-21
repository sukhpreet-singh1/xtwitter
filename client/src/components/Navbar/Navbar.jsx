import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <div className="grid grid-cols-1 pl-3 fixed md:grid-cols-4 my-5 justify-center">
      <div className="mx-auto md:mx-0">
        <img
          src="/xtwitter.png"
          alt="Twitter Logo"
          width={"40px"}
          className="ml-8"
        />
      </div>

      <div className="col-span-2 absolute left-96  md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
