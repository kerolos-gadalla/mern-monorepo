import dotenv from 'dotenv';
dotenv.config();

export const MONGO_CONNECTION_URI = process.env['MONGO_CONNECTION_URI'];
//   'mongodb+srv://mongoadmin:mongoadmin@localhost:28081/gateways?retryWrites=true&w=majority';
