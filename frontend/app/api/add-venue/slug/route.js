import clientPromise from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

export default async function POST({params}) {
  const { slug } = params;

  try {
    const db = (await clientPromise).db('hackthe6ix');

    await db
      .collection("venues")
      .updateOne({ venues: slug}, { $push: { channelId: headers.channelId } });

    return NextResponse.json({ message: 'ChannelID saved' }, { status: 200 });
  }
  catch(e) {
    console.log(e);
    return NextResponse.json({ message: 'ChannelID failed to save' }, { status: 500 });
  }
}