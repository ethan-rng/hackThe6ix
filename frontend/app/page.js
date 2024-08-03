"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Spline from '@splinetool/react-spline/next';
import mouse from '../public/mouse.svg';

export default function Home() {

  return (
    <main className="bg-white">
      <div>
        <div className="flex mt-20">
          <div className="w-1/2 mt-20 ml-20">
            <h1 className="text-6xl font-bold text-start">no more dying at concerts ❌❌❌💀💀💀</h1>
            <h1 className="mt-10 text-3xl text-start">some business line like save lives and see the signs before its joever</h1>
            <button className="mt-10 bg-black text-white text-3xl rounded-lg p-4">View Dashboard</button>
          </div>
          

          <div
            className="w-1/2"
          >
            <Spline
              scene="https://prod.spline.design/yVzSPG8NwsgEWQc7/scene.splinecode"
            />
          </div>
        </div>
        
      </div>
      
    </main>
  );
}

