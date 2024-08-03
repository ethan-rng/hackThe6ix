import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const NavBar = () => {
  const { user, error, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(0);
  const userSectionRef = useRef(null);

  const handleClickProfile = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Set the width of the panel to match the width of the user section
    if (userSectionRef.current) {
      setPanelWidth(userSectionRef.current.offsetWidth);
    }
  }, [isOpen]);

  return (
    <div className="w-full h-auto bg-primary flex flex-row px-10 pt-8 pb-2 items-center justify-between">
      <a href="/">
        <Image src="/logo.png" height={250} width={70} className="" />
      </a>

      <div className="flex flex-row items-center text-white text-2xl">
        <a href='/create-venue' className="mr-8">Create</a>
        <a href='/profile' className="mr-8">Dashboard</a>

        {user ? (
          <div
            ref={userSectionRef}
            className="rounded-full w-auto px-10 py-3 bg-highlight flex flex-row items-center text-right"
          >
            {user.name}
            <Image
              src="/arrowDown.png"
              height={10}
              width={10}
              onClick={handleClickProfile}
              className="ml-3 h-2 w-3 cursor-pointer"
            />
          </div>
        ) : (
          <a
            className="rounded-full px-10 py-3 bg-highlight"
            href="/api/auth/login"
          >
            Login
          </a>
        )}
      </div>

      {/* Overview of Panel */}
      {user && isOpen && (
        <div
          className="absolute bg-white rounded-md shadow-lg z-20 flex flex-col items-center"
          style={{ right: "2.5rem", top: "6rem", width: `${panelWidth}px` }}
        >
          <Image
            src={user.picture}
            className="rounded-full w-16 h-16 mt-3"
            width={20}
            height={20}
          />
          <h1 className=" w-full py-2 text-lg text-black text-center">
            Your Venues
          </h1>
          <a 
            href="/create-venue"
            className="block w-full py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">
            Create a New Venue
          </a>
          <a
            href="/api/auth/logout"
            className="block w-full py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
