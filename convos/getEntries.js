import datejs from 'date.js';
import bot from '../index';
import Entry from '../models/entry';
import getProjectName from '../lib/helper';

export default (res, convo) => {
  convo.ask(`Retieve project entries starting from which date?`, (res, convo) => { /* eslint no-shadow: 0 */
    convo.ask(`Until?`, (res, convo) => {
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const user = convo.source_message.user;
    const channel = convo.source_message.channel;
    const start = datejs(reponses[Object.keys(reponses)[0]]);
    const end = datejs(reponses[Object.keys(reponses)[1]]);

    bot.api.users.info({ user }, (e, slack) => {
      if (e) bot.say({ text: `Error fetching user`, channel });
      else {
        const name = slack.user.real_name;
        Entry.find({ name })
          .where('created').gt(start).lt(end)
          .then(entries => {
            const sum = entries.reduce((sum, entry) => sum + entry.hours, 0);
            bot.say({ text: `Total of ${sum} hours logged between ${start} and ${end}`, channel });
          })
          .catch(e => bot.say({ text: `Error fetching entries`, channel }));
      }
    });
  });
};
