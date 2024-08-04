"use server";
import React from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import SubmitBtn from "./submit-btn";
import Image from "next/image";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { readFile } from "fs/promises";

const page = async () => {
  const session = await getSession();

  const handleSubmitForm = async (formData) => {
    "use server";
    const db = (await clientPromise).db("hackthe6ix");
    const file = formData.get("files");

    const fileData = await file.arrayBuffer();
    const base64Image = Buffer.from(fileData).toString("base64");

    const resultVenue = await db.collection("venues").insertOne({
      userID: session.email,
      venueName: formData.get("name"),
      seatingLimit: formData.get("seatingLimit"),
      length: formData.get("length"),
      width: formData.get("width"),
      image: "data:image/png;base64, " + base64Image,
    });

    const venueId = resultVenue.insertedId;

    await db
      .collection("users")
      .updateOne({ email: session.email }, { $push: { venues: venueId } });

    redirect(`/venue/${venueId}`);
  };

  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <h1 className="text-4xl text-center mb-5 bg-highlight w-1/3 text-white py-3 rounded-3xl">
        Please Create A New Venue/Event Here
      </h1>

      <div className="w-full mt-10 flex flex-row">
        <div className="relative w-1/2 h-auto ml-10">
          <Image
            src="/b2b.jpeg"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
        <form
          className="flex flex-col items-left w-1/2 mr-10"
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

          <label className="mb-2 text-xl w-[32rem] text-left">
            Seating Size Limit:
          </label>
          <input
            type="number"
            name="seatingLimit"
            className="mb-4 p-2 border rounded-3xl w-[32rem]"
            required
          />

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
