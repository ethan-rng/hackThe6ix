"use client";

import { useState } from 'react';
import Image from "next/image";
import YouTubeStream from './youtube';

const sideBarCSS = `flex flex-row items-center text-3xl hover:bg-secondary w-full h-16 pl-10`

export default function Nav() {
  const [videoId, setVideoId] = useState('Dz0um47Bofo');

  const feed1Clicked = () => {
    setVideoId('Dz0um47Bofo');
  }

  const feed2Clicked = () => {
    setVideoId('');
  }

  const handleSubmit = () => {
    setVideoId('');
  }

  return (
    <div className="w-full h-full flex flex-col">

      <div className="w-full h-full ">
        <div className="fixed top-32 left-0 z-50 w-1/6 h-full flex flex-col border-r-2 bg-highlight rounded-r-3xl text-white font-light pb-16">
          <div className='mt-6 text-3xl ml-3 flex flex-row items-center'>
            Live Feeds
            <Image src="/arrowDown.png" height={90} width={120} className="border- ml-2 border-red-400 h-4 w-5" />
          </div>

          {

          }

          <div className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/video.png'
              width={25}
              height={30}
            />
            <button onClick={feed1Clicked}>Live Feed 1</button>
          </div>

          <div className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/video.png'
              width={25}
              height={30}
            />
            <button onClick={feed2Clicked}>Live Feed 2</button>
          </div>

          <div className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/pin.png'
              width={20}
              height={20}
            />
            Heat Map
          </div>

          <div
            className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/upload.png'
              width={35}
              height={60}
            />
            Add Feeds
          </div>
        </div>

        <div className="w-2/3">
          {videoId !== '' ? 
          <YouTubeStream videoId={videoId}/>
          :
          <form className='ml-96'>
            <input className='ml-96 items-center' type='text' placeholder='Enter livestream ID'/>
            <button type='submit' onClick={handleSubmit}>Save</button>
          </form>
          }
        </div>
      </div>
    </div>
  )
}