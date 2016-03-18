import datejs from 'date.js';
import bot from '../index';
import Entry from '../models/entry';
import getProjectName from '../lib/helper';

export default (res, convo) => {
  convo.ask(`Retrieve project entries starting from which date?`, (res, convo) => { /* eslint no-shadow: 0 */
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
        getProjectName(channel)
          .then(project => {
            Entry.find({ name, project })
              .where('created').gt(start).lt(end)
              .where('project').equals(project)
              .then(entries => {
                const sum = entries.reduce((sum, entry) => sum + entry.hours, 0);
                bot.say({ text: `Total of ${sum} hours logged between ${start} and ${end} for project ${project}`, channel });
              });
          })
          .catch(() => bot.say({ text: `Error fetching entries`, channel }));
      }
    });
  });
};
