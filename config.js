import dotenv from 'dotenv';

dotenv.load();

export default {
  slackToken: process.env.SLACKTOKEN,
  tickSubId: process.env.TICKSUBID,
  tickToken: process.env.TICKTOKEN,
};
