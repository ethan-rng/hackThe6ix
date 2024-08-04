"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

const ProfilePic = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
        <div className="mt-4 flex flex-row items-center text-xl font-thin">
            <Image
                src={user.picture}
                width={35}
                height={35}
                className="rounded-full "
            />
            <div className="ml-3">{user.name}</div>
        </div>
      
    </div>
  );
};

export default ProfilePic;
