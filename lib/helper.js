import bot from '../index';

export default id => new Promise((resolve, reject) => {
  bot.api.channels.info({ channel: id }, (e, channel) => {
    if (e) reject(e);
    resolve(channel.channel.name);
  });
});
