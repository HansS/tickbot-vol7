import bot from '../index';
import Entry from '../models/entry';
import getProjectName from '../lib/helper';

export default (res, convo) => {
  const startTime = new Date();
  convo.ask(`Ok, just let me know when you've finished!`, (res, convo) => { /* eslint no-shadow: 0 */
    convo.ask(`Any notes to add?`, (res, convo) => {
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const notes = reponses[Object.keys(reponses)[0]];
    const user = convo.source_message.user;
    const channel = convo.source_message.channel;
    const hours = Math.round(((startTime - new Date()) % 86400000) / 3600000);

    bot.api.users.info({ user }, (e, slack) => {
      if (e) throw new Error(e);
      getProjectName(channel)
        .then(project => {
          const entry = new Entry({ slack: slack.user.id, project, hours, notes });
          entry.save()
            .then(() => bot.say({ text: `Entry submitted`, channel }))
            .catch(() => bot.say({ text: `Error submiting entry`, channel }));
        });
    });
  });
};
