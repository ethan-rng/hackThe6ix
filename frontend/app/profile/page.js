// app/page.tsx (or .jsx)

import Image from 'next/image';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import clientPromise from "@/lib/mongodb";
import SearchBar from './search-bar';

const fetchUserVenues = async () => {
  const session = await getSession();
  const userEmail = session.user.email;

  const client = await clientPromise;
  const db = client.db('hackthe6ix');

  // Fetch user document
  const user = await db.collection('users').findOne({ email: userEmail });
  if (!user) {
    return { error: 'User not found' };
  }

  // Fetch venues by their ObjectIds
  const venueIds = user.venues;
  const venues = await db.collection('venues').find({ _id: { $in: venueIds } }).toArray();

  return venues;
};

const Page = async () => {
  const posts = await fetchUserVenues();

  if (posts.error) {
    return (
      <div className="w-full mt-16 flex flex-col items-center">
        <p className="text-xl text-red-500">{posts.error}</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-16">
      <SearchBar />

      <div className="flex flex-col items-center mt-10">
        {posts.length === 0 ? (
          <div className="flex flex-row items-center">
            <p className="mr-3 text-xl">Loading Your Venues</p>
            <Image src="/loading.gif" width={30} height={30} alt="Loading" />
          </div>
        ) : (
          <div className='mx-10 w-full'>
            {posts.map((post, index) => (
              <div className='hover:scale-105 w-full border-2 bg-highlight'>
                <a 
                  className=''
                  href={`/venue/${post._id}`} 
                  key={index}
                >
                  <h2>{post.venueName}</h2>
                  <p>Seating Limit: {post.seatingLimit}</p>
                  <p>Dimensions: {post.dimensions}</p>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default withPageAuthRequired(Page);
