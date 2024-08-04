"use client";

import React, { useState } from "react";
import Image from "next/image";
import Spline from "@splinetool/react-spline/next";
import Spline from "@splinetool/react-spline/next";
import mouse from "../public/mouse.svg";

export default function Home() {
  return (
    <main className="bg-white">
      <div>
        <div className="flex mt-20">
          <div className="w-1/2 mt-20 ml-20 flex items-center h-screen">
            <div>
              <div className="flex">
                {" "}
                <img src="flocklogo2.png" className="h-24"></img>
                <h1
                  className="mb-10 text-8xl font-bold text-start"
                  style={{ paddingLeft: "0.5em" }}
                >
                  Flock
                </h1>
              </div>
              <h1 className="mb-10 text-6xl font-bold text-start">
                Your Ultimate Crowd Surge Management Solution
              </h1>
              <button
                className="mt-5 bg-black text-white text-3xl rounded-lg p-4"
                href="/profile"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="w-1/2">
            <Image
              src="/herocamera.png"
              height={800}
              width={800}
              className=""
            />
          </div>
        </div>
        <div className="flex ml-20 mr-20">
          <div>
            <h1 className="mt-10 text-5xl text-start">
              Where Safety Meets Innovation
            </h1>
            <p className="mt-10 mb-10 text-xl text-start">
              Flock is the cutting-edge solution designed to ensure safety and
              control at concerts and large gatherings. Our innovative
              technology utilizes drone aerial footage to monitor and manage
              crowd surges, creating a secure environment where fans can enjoy
              the moment without worry.
            </p>
          </div>
        </div>
        <div className="flex ml-20 mr-20 mb-5">
          <h1 className="mt-10 text-5xl text-start">Why Flock?</h1>
        </div>
        <div className="flex ml-20 mr-20">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="mt-10 text-2xl text-start">
              Intelligent Crowd Control
            </h2>
            <p className="mt-10 mb-10 text-xl text-start">
              Leverage real-time aerial footage and advanced algorithms to
              monitor crowd density and movement, predicting potential surges
              before they happen.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="mt-10 text-2xl text-start">Instant Alerts</h2>
            <p className="mt-10 mb-10 text-xl text-start">
              Keep your team informed with instant notifications about high-risk
              areas, enabling swift action to prevent overcrowding and ensure
              smooth flow.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="mt-10 text-2xl text-start">
              Enhanced Fan Experience
            </h2>
            <p className="mt-10 mb-10 text-xl text-start">
              Focus on the music and the memories, not the safety concerns.
              Flock ensures a seamless, enjoyable experience for all attendees.
            </p>
          </div>
        </div>
        <a href="/profile"></a>
      </div>
    </main>
  );
}
