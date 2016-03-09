import bot from '../index';
import Entry from '../models/entry';
import getProjectName from '../lib/helper';
import datejs from 'date.js';

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
    const rawStart = reponses[Object.keys(reponses)[0]];
    const rawEnd = reponses[Object.keys(reponses)[1]];
    const parsedStart = datejs(rawStart);
    const parsedEnd = datejs(rawEnd);

    bot.api.users.info({ user }, (e, slack) => {
      if (e) throw new Error(e);
      getProjectName(channel)
        .then(project => {
          Entry.find({ slack: slack.user.id, project })
            .where('created').gt(parsedStart).lt(parsedEnd)
            .where('project').equals(project)
            .then(entries => {
              const sum = entries.reduce((sum, entry) => sum + entry.hours, 0);
              bot.say({ text: `Total of ${sum} hours logged between ${parsedStart} and ${parsedEnd} for project ${project}`, channel });
            });
        })
        .catch(() => bot.say({ text: `Error fetching entries`, channel }));
    });
  });
};
