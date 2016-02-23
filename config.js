import dotenv from 'dotenv';

dotenv.load();

export default {
  slackToken: process.env.SLACKTOKEN,
  db: process.env.MONGO_URL,
};
