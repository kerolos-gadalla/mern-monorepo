import { MONGO_CONNECTION_URI } from '@/env';
import mongoose from 'mongoose';

export const retry = true;

const connectWithRetry = () => {
  mongoose.connect(MONGO_CONNECTION_URI as string, {});
};

connectWithRetry();

const db = mongoose.connection;
db.on('error', err => {
  if (retry) {
    console.log('MongoDB connection failed, retrying in 2 seconds');
    setTimeout(connectWithRetry, 2000);
  } else {
    console.log('MongoDB connection failure: ' + err);
  }
});

db.on('connected', () => {
  console.log('MongoDB connection established successfully');
});
