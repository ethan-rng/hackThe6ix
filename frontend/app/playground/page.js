import React from "react";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Heatmap from "@/components/Heatmap";

const Page = async () => {
  //   async function uploadImage(imageFile) {
  //     const formData = new FormData();
  //     formData.append("image", imageFile); // Append the image file

  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/analyze_frame", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log("Success:", data);
  //       return data; // Return the data
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }

  //   const data = await uploadImage(
  //     "C:UsersJackyOneDriveDocuments_SideProjectshackThe6ix\frontendpublicplaceholder.jpg"
  //   );
  //   console.log("Data:", data);
  // data = [];

  return (
    <div className="w-full mt-16">
      <div className="flex flex-col items-center mt-10">
        <div>
          <h1>Playground</h1>
          <p>
            Play around with the heatmap and see how it changes with different
            data points
          </p>
        </div>
        <div style={{ position: "relative", width: "100%", height: "500px" }}>
          <Image
            src={"/placeholder.jpg"}
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {/* {data && <Heatmap data={data} />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withPageAuthRequired(Page);
