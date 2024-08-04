"use server";
import React from "react";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Heatmap from "@/components/Heatmap";
import UploadForm from ".//UploadForm";

const Page = async () => {
  return (
    <div className="w-full mt-16">
      <div className="flex flex-col items-center mt-10">
        <div>
          <h1>Playground</h1>
          <p>
            Play around with the heatmap and see how it changes with different
            data points
          </p>
          <UploadForm />
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
