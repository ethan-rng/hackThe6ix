"use server";
import React from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import SubmitBtn from "./submit-btn";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

const page = async () => {
  const session = await getSession();

  const handleSubmitForm = async (formData) => {
    "use server";
    const db = (await clientPromise).db("hackthe6ix");
    const file = formData.get("files");

    const fileData = await file.arrayBuffer();
    const base64Image = Buffer.from(fileData).toString("base64");

    const resultVenue = await db.collection("venues").insertOne({
      userID: session.user.email,
      venueName: formData.get("name"),
      seatingLimit: formData.get("seatingLimit"),
      length: formData.get("length"),
      width: formData.get("width"),
      image: "data:image/png;base64, " + base64Image,
    });

    const venueId = resultVenue.insertedId;

    await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $push: { venues: venueId } });

    redirect(`/venue/${venueId}`);
  };

  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <div className="mx-10 text-3xl border-red-300 border- text-left mb-5 w-[69%] font-semibold text-black py-3 rounded-3xl">
        <h1>Please Create A New Venue/Event Here</h1>
        <p className='font-light text-xl mt-3'>
            A repository contains all your venue's camera's and crowds sourcing needs. Simply add your venue's information below and we can begin monitoring your venue's occupancy level.

        </p>
      </div>

      <div className="w-full mt-5 mx-10 flex flex-row justify-center border- border-blue-300">
        <form
          className="flex flex-col items-left w-2/3 mr-10 border- border-red-300"
          action={handleSubmitForm}
        >
          <label className="mb-2 text-xl w-[32rem] text-left">
            Venue Name:
          </label>
          <input
            type="text"
            name="name"
            className="mb-4 p-2 border rounded-3xl w-[32rem]"
            required
          />
            <div className='w-full h-1 my-8 rounded-xl bg-zinc-300'/>
          <label className="mb-2 text-xl w-[32rem] text-left">
            Length in Meters:
          </label>
          <input
            type="number"
            name="length"
            className="mb-4 p-2 border rounded-3xl w-[32rem]"
            required
          />

          <label className="mb-2 text-xl w-[32rem] text-left">
            Width in Meters:
          </label>
          <input
            type="number"
            name="width"
            className="mb-4 p-2 border rounded-3xl w-[32rem]"
            required
          />
            <div className='w-full h-1 my-8 rounded-xl bg-zinc-300'/>

          <label className="mb-2 text-xl w-[32rem] text-left">
            Seating Size Limit:
          </label>
          <input
            type="number"
            name="seatingLimit"
            className="mb-4 p-2 border rounded-3xl w-[32rem]"
            required
          />
            <div className='w-full h-1 mt-8 rounded-xl bg-zinc-300'/>

          <label className="mb-5 mt-10 text-xl text-left w-[32rem] ">
            Pictures/Videos of Venue
          </label>
          <input
            className="text-left w-[32rem]"
            name="files"
            type="file"
            required
          />
          <SubmitBtn />
        </form>
      </div>
    </div>
  );
};

export default withPageAuthRequired(page);
