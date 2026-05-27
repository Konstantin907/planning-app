import { setServers } from 'node:dns/promises';
import mongoose from 'mongoose';

setServers(['1.1.1.1', '8.8.8.8']);

function startKeepAlive() {
  const db = mongoose.connection.db;

  const pingDB = async () => {
    try {
      await db.admin().ping();
      console.log('Pinged Mongo cluster to keep it alive');
    } catch (err) {
      console.error('Ping failed:', err.message);
    }
  };

  setInterval(pingDB, 30 * 60 * 1000);
}

export async function connectDB() {
  await mongoose.connect(process.env.MONGO);
  console.log('Mongo connected!');
  startKeepAlive();
}
