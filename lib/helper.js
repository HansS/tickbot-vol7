import bot from '../index';

export default function getProjectName(id) {
  return new Promise((resolve, reject) => {
    bot.api.channels.info({ channel: id }, (e, channel) => {
      if (e) reject(e);
      resolve(channel.channel);
    });
  });
}
