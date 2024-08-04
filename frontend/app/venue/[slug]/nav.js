"use client";

import { useState } from 'react';
import Image from "next/image";
import TwitchStream from './twitch';

const sideBarCSS = `flex flex-row items-center text-3xl hover:bg-secondary w-full h-16 pl-10`

export default function Nav({params}) {
  const { slug } = params;
  const data = fetch(`http://localhost:3000/api/venue/${slug}`);

  const [channelId, setChannelId] = useState(data);
  const [heatMap, setHeatMap] = useState(false);

  const feeds = [];

  const feed1Clicked = () => {
    setChannelId(data);
    setHeatMap(false);
  }

  const heatMapClicked = () => {
    if(channelId != '') {
      setChannelId(0);
    }
    setHeatMap(true);
  }

  const handleSubmit = () => {
    const data = fetch(`http://localhost:3000/api/add-venue/${slug}`, {
      body: JSON.stringify({
        'channelId': id
      })
    });
    setChannelId(id);
  }

  const addFeed = () => {

  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full ">
        <div className="fixed top-32 left-0 z-50 w-1/6 h-full flex flex-col border-r-2 bg-highlight rounded-r-3xl text-white font-light pb-16">
          <div className='mt-6 text-3xl ml-3 flex flex-row items-center'>
            Live Feeds
            <Image src="/arrowDown.png" height={90} width={120} className="border- ml-2 border-red-400 h-4 w-5" />
          </div>

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
              src='/pin.png'
              width={20}
              height={20}
            />
            <button onClick={heatMapClicked}>Heat Map</button>
          </div>

          <div
            className={sideBarCSS}>
            <Image 
              className='mr-3'
              src='/upload.png'
              width={35}
              height={60}
            />
            <button onClick={addFeed}>Add Feeds</button>
          </div>
        </div>

        <div className="w-2/3">
          {channelId !== '' ? 
          <TwitchStream channelId={channelId}/>
          :
          channelId == 0 ?
          <div></div>
          :
          <form className='ml-96'>
            <input className='ml-96 items-center' type='text' value='id' placeholder='Enter livestream ID'/>
            <button type='submit' onClick={handleSubmit}>Save</button>
          </form>
          }
        </div>
      </div>
    </div>
  )
}