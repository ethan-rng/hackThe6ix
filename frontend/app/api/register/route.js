import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const db = clientPromise.db('hackthe6ix');
      const result = await db.collection('users').insertOne({ email });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user record' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
