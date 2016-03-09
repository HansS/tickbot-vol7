import bot from '../index';
import Entry from '../models/entry';
import getProjectName from '../lib/helper';

export default (res, convo) => {
  convo.ask(`How many hours are you logging for this entry?`, (res, convo) => { /* eslint no-shadow: 0 */
    convo.say(`Awesome.`);
    convo.ask(`Any notes to add?`, (res, convo) => {
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const hours = reponses[Object.keys(reponses)[0]];
    const notes = reponses[Object.keys(reponses)[1]];
    const user = convo.source_message.user;
    const channel = convo.source_message.channel;

    bot.api.users.info({ user }, (e, slack) => {
      if (e) throw new Error(e);
      getProjectName(channel)
        .then(project => {
          const entry = new Entry({ slack: slack.user.id, project, hours, notes });
          entry.save()
            .then(() => bot.say({ text: `${hours} hours submitted for ${project}!!1`, channel }))
            .catch(() => bot.say({ text: `Error submiting entry`, channel }));
        });
    });
  });
};
