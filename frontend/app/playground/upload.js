// pages/api/upload.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { image } = req.body;
      // Process the image data here
      console.log(image);

      // Respond with a success message
      res.status(200).json({ message: 'Image received successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
