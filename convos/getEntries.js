import bot from '../index';
import getEntries from '../events/getEntries';
import getUsers from '../events/getUsers';

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
    const userSlackId = convo.source_message.user;
    const channelId = convo.source_message.channel;

    bot.api.users.info({ user: userSlackId }, (error, slackUser) => {
      if (error) bot.say({ text: `Error couldn't fetch user`, channel: channelId });
      else {
        getUsers()
          .then(tickUsers => tickUsers.filter(tickUser => tickUser.last_name === slackUser.user.profile.last_name)[0])
          .then(user => getEntries(user.id, startDate, endDate))
          .then(entries => {
            const sum = entries.reduce((sum, entry) => sum + entry.hours, 0);
            bot.say({ text: `Total of ${sum} hours logged between ${startDate} and ${endDate}`, channel: channelId });
          })
          .catch(error => bot.say({ text: `Error fetching entries`, channel: channelId }))
      }
    });
  });
};
