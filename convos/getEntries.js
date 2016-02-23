import bot from '../index';
import Entry from '../models/entry';

export default (response, convo) => {
  convo.ask(`Retieve project entries starting from which date? (yyyy-mm-dd)`, (response, convo) => {
    convo.ask(`Until?`, (response, convo) => {
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const startDate = reponses[Object.keys(reponses)[0]];
    const endDate = reponses[Object.keys(reponses)[1]];
    const user = convo.source_message.user;
    const channel = convo.source_message.channel;

    bot.api.users.info({ user }, (e, slackUser) => {
      if (e) bot.say({ text: `Error fetching user`, channel });
      else {
        Entry.find({ user })
          .where('created').gt(startDate).lt(endDate)
          .then(entries => {
            const sum = entries.reduce((sum, entry) => sum + entry.hours, 0);
            bot.say({ text: `Total of ${sum} hours logged between ${startDate} and ${endDate}`, channel });
          })
          .catch(e => bot.say({ text: `Error fetching entries`, channel }));
      }
    });
  });
};
