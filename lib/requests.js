import request from 'request';
import config from '../config';

export default ({ method, path, data }) => {
  const options = {
    url: `https://www.tickspot.com/${config.tickSubId}/api/v2/${path}`,
    method,
    headers: {
      'Authorization': `Token token=${config.tickToken}`,
      'User-Agent': `Volume 7 Slackbot (connor.brathwaite@gmail.com)`,
      'Content-Type': `application/json`,
    },
  };

  if (method === 'POST') options.body = JSON.stringify(data);

  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) reject(error);
      else resolve(JSON.parse(body));
    });
  });
};
