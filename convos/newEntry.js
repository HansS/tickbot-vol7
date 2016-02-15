import bot from '../index';
import newEntry from '../events/newEntry';
import getTasks from '../events/getTasks';
import getUsers from '../events/getUsers';

async function postEntry(slackUser, taskName, hours, notes) {
  const tickUsers = await getUsers();
  const tasks = await getTasks();
  const user = tickUsers.filter(tickUser => tickUser.last_name === slackUser.user.profile.last_name)[0];
  const task = tasks.filter(task => task.name === taskName)[0];

  return newEntry(task.id, user.id, hours, notes)
}

export default (response, convo) => {
  convo.ask(`What task is this entry for?`, (response, convo) => {
    convo.say(`Awesome.`);
    convo.ask(`And how many hours did it take?`, (response, convo) => {
      convo.ask(`Any notes to add?`, (response, convo) => {
        convo.next();
      });
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const taskName = reponses[Object.keys(reponses)[0]];
    const hours = reponses[Object.keys(reponses)[1]];
    const notes = reponses[Object.keys(reponses)[2]];
    const userSlackId = convo.source_message.user;
    const channelId = convo.source_message.channel;

    bot.api.users.info({ user: userSlackId }, (error, slackUser) => {
      if (error) console.log(`couldnt fetch user`);
      else {
        postEntry(slackUser, taskName, hours, notes)
          .then(entry => bot.say({ text: `Entry submitted`, channel: channelId }))
          .catch(error => bot.say({ text: `Error submiting entry`, channel: channelId }))
      }
    });
  });
};
