"use client";
import React from "react";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="relative mx-10 flex items-center">
      <input
        className="w-full p-2 border rounded-3xl pr-12"
        placeholder="Search for a Venue"
      />
      <div className="absolute right-3">
        <Image src="/magnify.png" width={30} height={30} alt="Search Icon" />
      </div>
    </div>
  );
};

export default SearchBar;
