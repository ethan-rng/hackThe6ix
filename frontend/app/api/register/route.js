import clientPromise from "../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Failed to register user', error: "email missing" }, { status: 400 });
        }


        const db = (await clientPromise).db('hackthe6ix');

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already registered' }, { status: 400 });
        }

        const result = await db.collection('users').insertOne({ email, venues:[] });

        return NextResponse.json({ message: 'User registered successfully', result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to register user', error: error.message }, { status: 500 });
    }
}
