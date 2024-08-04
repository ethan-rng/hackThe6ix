import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const sideBarCSS = `flex flex-row items-center text-3xl hover:bg-secondary w-full h-16 pl-10`

const page = async ({params}) => {
  const { slug } = params;

  const client = await clientPromise;
  const db = client.db('hackthe6ix');
  const venue = await db.collection('venues').findOne({_id: new ObjectId(slug)});
console.log(venue)

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-secondary h-16">{/* Alert Messages */}</div>

      <div className="w-full h-full">
        <div className="w-1/6 h-full flex flex-col border-r-2">
          <div className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/video.png'
              width={25}
              height={30}
            />
            Live Video
          </div>

          <div className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/pin.png'
              width={25}
              height={30}
            />
            Heat Map
          </div>

          <div
            className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/upload.png'
              width={35}
              height={60}
            />
            Upload
          </div>
        </div>


        <div className="w-5/6">
          <Image
          src={venue.image}
          width={90}
          height={50}
          
          />

        </div>
      </div>
    </div>
  );
};

export default withPageAuthRequired(page);
