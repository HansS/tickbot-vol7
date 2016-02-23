import bot from '../index';
import Entry from '../models/entry';

export default (response, convo) => {
  convo.ask(`Ok, just let me know when you've finished!`, (response, convo) => {
    const startTime = new Date();
    convo.ask(`Any notes to add?`, (response, convo) => {
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const taskName = reponses[Object.keys(reponses)[0]];
    const notes = reponses[Object.keys(reponses)[2]];
    const user = convo.source_message.user;
    const channelId = convo.source_message.channel;
    const hours = Math.round(((startTime - new Date()) % 86400000) / 3600000);

    bot.api.users.info({ user }, (e, slackUser) => {
      if (e) throw new Error(e);
      else {
        const entry = new Entry({ slack, hours, notes });
        entry.save()
          .then(entry => bot.say({ text: `Entry submitted`, channel }))
          .catch(error => bot.say({ text: `Error submiting entry`, channel }));
      }
    });
  });
}
