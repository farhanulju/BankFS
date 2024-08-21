import { MongoClient, MongoTopologyClosedError } from 'mongodb';

const uri = 'mongodb+srv://vercel-admin-user:wzsRctGyWf3oPNbb@iba29.zhjzy72.mongodb.net/bankfs?retryWrites=true&w=majority';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // in milliseconds

async function executeWithRetry(operation, retries = MAX_RETRIES) {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof MongoTopologyClosedError && retries > 0) {
      console.warn(`MongoDB topology closed. Retrying in ${RETRY_DELAY}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return executeWithRetry(operation, retries - 1);
    }
    throw error;
  }
}

export default async function handler(req, res) {
  const client = new MongoClient(uri);

  if (req.method === 'POST') {
    try {
      await client.connect();
      const db = client.db('bankfs');
      const collection = db.collection('bank-mfs-data');
      const { bank, mfs,created_date } = req.body;
      await executeWithRetry(() => collection.insertOne({ bank, mfs, created_date }));
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error storing data' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('bankfs');
      const collection = db.collection('bank-mfs-data');
      const data = await executeWithRetry(() => collection.find().toArray());
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching data' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}