import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Nav from './nav';

const page = async ({params}) => {
  const { slug } = params;

  const client = await clientPromise;
  const db = client.db('hackthe6ix');
  const venue = await db.collection('venues').findOne({_id: new ObjectId(slug)});

  return (
    <>
      <div className="w-5/6">
        <Image
        src={venue.image}
        width={90}
        height={50}
        />
      </div>
      <Nav/>
    </>
  );
};

export default withPageAuthRequired(page);
