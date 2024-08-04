import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';

export async function GET({params}) {
  try {
    const db = (await clientPromise).db('hackthe6ix');

    const channelId = await db.collection('venues').findOne({ _id: new ObjectId(params) });

    return NextResponse.json({ message: 'ChannelID found', channelId }, { status: 200 });
  }
  catch(e) {
    console.log(e);
    const channelId = '';
    return NextResponse.json({ message: 'No ChannelID found', channelId }, { status: 500 });
  }
}