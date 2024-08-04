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
    <div className="z-50 mb-32 fixed top-0 left-0 w-full bg-primary flex flex-row px-10 py-4 items-center justify-between">
      <a className="flex flex-row items-center text-white text-4xl" href="/">
        <Image src="/flocklogo.png" height={150} width={45} className="" />
        <h1 className="pl-3">Flock</h1>
      </a>

      <div className="flex flex-row items-center text-white text-xl">
        <a href='/create-venue' className="mr-8">Add Venue</a>
        <a href='/profile' className="mr-8">Dashboard</a>

        {user ? (
          <div
            ref={userSectionRef}
            className="rounded-full w-auto px-8 py-2 bg-highlight flex flex-row items-center text-right cursor-pointer"
            onClick={handleClickProfile}
          >
            {user.name}
            <Image
              src="/arrowDown.png"
              height={10}
              width={10}
              className="ml-3 h-2 w-3"
            />
          </div>
        ) : (
          <a
            className="rounded-full px-8 py-2 bg-highlight"
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
