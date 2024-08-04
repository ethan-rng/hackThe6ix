import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Nav from "./nav";
import Heatmap from "@/components/Heatmap";

const sideBarCSS = `flex flex-row items-center text-3xl hover:bg-secondary w-full h-16 pl-10`;

const page = async ({ params }) => {
  const { slug } = params;

  const client = await clientPromise;
  const db = client.db("hackthe6ix");
  const venue = await db
    .collection("venues")
    .findOne({ _id: new ObjectId(slug) });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row">
        <div className="w-1/6 flex flex-col h-screen">
        </div>

        <div className="w-5/6 flex justify-center items-center max-h-screen overflow-auto bg-purple-500">
          <div className="relative w-full h-full">
            {/* <Image
              src={"/placeholder.jpg"}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="max-h-full w-full"
            /> */}
            <Heatmap
              data={{
                prediction: [
                  { x: 10, y: 10 },
                  { x: 100, y: 100 },
                  { x: 200, y: 200 },
                  { x: 300, y: 300 },
                  { x: 400, y: 400 },
                  { x: 500, y: 500 },
                  { x: 600, y: 600 },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default withPageAuthRequired(page);
