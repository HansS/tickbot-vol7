import moment from 'moment'
import bot from '../index';
import Entry from '../models/entry';
import getProjectName from '../lib/helper';

export default (res, convo) => {
  const start = new Date();
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
    const hours = moment.duration(new Date() - start).asHours();
    
    bot.api.users.info({ user }, (e, slack) => {
      if (e) bot.say({ text: `Error fetching user`, channel });
      else {
        const username = slack.user.real_name;
        getProjectName(channel)
          .then(project => {
            const entry = new Entry({ username, project, hours, notes });
            entry.save()
              .then(() => bot.say({ text: `${hours} hours submitted for ${project}!!1`, channel }))
              .catch(() => bot.say({ text: `Error submiting entry`, channel }));
          });
      }
    });
  });
};
