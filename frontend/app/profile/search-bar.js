"use client";
import React from "react";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="relative mx-[5rem] flex items-center">
      <input
        className="w-full p-2 border rounded-3xl pr-12 text-2xl font-light pl-10"
        placeholder="Search for a Venue"
      />
      <div className="absolute right-3">
        <Image className='m-3' src="/magnify.png" width={25} height={25} alt="Search Icon" />
      </div>
    </div>
  );
};

export default SearchBar;
