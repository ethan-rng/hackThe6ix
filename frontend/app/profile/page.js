import Image from "next/image";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import SearchBar from "./search-bar";
import ProfilePic from "./image-pfp";


const fetchUserVenues = async () => {
  try {
    // Ensure the client is connected to MongoDB
    const client = await clientPromise;
    const db = client.db("hackthe6ix");

    // Fetch the session and user data server-side
    const session = await getSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      throw new Error("User not authenticated");
    }

    // Fetch user document
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch venues by their ObjectIds
    const venueIds = user.venues || [];
    const venues = await db
      .collection("venues")
      .find({ _id: { $in: venueIds } })
      .toArray();

    return { venues, error: null };
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    return { venues: [], error: error.message };
  }
};

// `Page` component defined as an async server component
const Page = async () => {

  const { venues, error } = await fetchUserVenues();

  if (error) {
    return (
      <div className="w-full mt-16 flex flex-col items-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (venues.length === 0) {
    // No posts found
    return (
      <div className="w-full mt-16 items-center justify-center">
        <SearchBar />
        <p className="text-5xl font-light mt-10 text-center w-full">
          No Venues Found
        </p>
        <span className="flex flex-row border- border-red-300 justify-center">
          <p className="text-3xl font-extralight mt-5 text-left">
            Start by adding some venues in the Add Venue tab or by clicking
          </p>
          <a
            href="/create-venue"
            className="text-3xl text-blue-500 font-extralight ml-2 mt-5 text-left"
          >
            here
          </a>
        </span>
      </div>
    );
  }

  return (
    <div className="w-full mt-16">
      <SearchBar />
      <div className="flex flex-col items-center mt-10">
        <div className="mx-10 w-full flex flex-col items-center">
          {venues.map((post, index) => (
            <div
              className="mb-5 hover:scale-105 w-[90%] mx-10 h-[26rem] border-2 border-primary text-tertiary rounded-3xl bg-highlight"
              key={index}
            >
              <a className='flex flex-row w-full h-full m-10' href={`/venue/${post._id}`}>
                <div className='relative w-1/3 h-4/5'>
                  <Image
                    src={post.image}
                    alt={post.venueName}
                    layout="fill" // Fill the parent container
                    objectFit="cover" // Cover the area, maintaining aspect ratio
                    className="image rounded-lg"
                  />

                </div>
                <div className='w-2/3 ml-16 text-xl'>
                  <h2 className='font-bold text-3xl'>{post.venueName}</h2>
                  <ProfilePic/>
                  
                  <p className='mt-5'>Seating Limit: {post.seatingLimit}</p>
                  <p>Length: {post.length} m</p>
                  <p>Width: {post.width} m</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withPageAuthRequired(Page);
