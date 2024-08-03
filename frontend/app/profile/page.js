import Image from "next/image";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import SearchBar from "./search-bar";

const Page = () => {
  let loading = true;
  
  // const posts = await fetch()



  return (
    <div className="w-full mt-16">
      <SearchBar/>

      <div className="flex flex-col items-center mt-10">
        {loading ? (
          <div className="flex flex-row items-center">
            <p className="mr-3 text-xl">Loading Your Venues</p>
            <Image src="/loading.gif" width={30} height={30} />
          </div>
        ) : (
          <div>
            {posts.map((post, index) => (
              <div key={index}>
                {post.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default withPageAuthRequired(Page);
