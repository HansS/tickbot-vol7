import bot from '../index';
import Entry from '../models/entry';

export default (response, convo) => {
  convo.ask(`How many hours are you logging for this entry?`, (response, convo) => {
    convo.say(`Awesome.`);
      convo.ask(`Any notes to add?`, (response, convo) => {
        convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const hours = reponses[Object.keys(reponses)[0]];
    const notes = reponses[Object.keys(reponses)[1]];
    const slack = convo.source_message.user;
    const channel = convo.source_message.channel;

    bot.api.users.info({ user: slack }, (e, slackUser) => {
      if (e) throw new Error(e);
      const entry = new Entry({ slack, hours, notes });
      entry.save()
        .then(entry => bot.say({ text: `Entry submitted`, channel }))
        .catch(error => bot.say({ text: `Error submiting entry`, channel }));
    });
  });
};
