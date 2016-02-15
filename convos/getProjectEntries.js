import getTaskIdFromName from '../lib/helpers';
import getProjectEntries from '../events/getEntries';
import getProjects from '../events/getProjects';

async function asyncProjectEntries(slackUser, channelName, startDate, endDate) {
  const tickUsers = await getUsers();
  const projects = getProjects();
  const user = tickUsers.filter(tickUser => tickUser.last_name === slackUser.user.profile.last_name)[0];
  const project = projects.filter(project => project.name === channelName)[0];

  return getProjectEntries(user.id, project.id, startDate, endDate);
}

export default (response, convo) => {
  convo.ask(`Retieve project entries starting from which date? (yyyy-mm-dd)`, (response, convo) => {
    convo.ask(`Until?`, (response, convo) => {
      convo.next();
    })
    convo.next();
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const startDate = reponses[Object.keys(reponses)[0]];
    const endDate = reponses[Object.keys(reponses)[1]];
    const userSlackId = convo.source_message.user;
    const channelId = convo.source_message.channel;
    const channelName = channel.channel.name;

    bot.api.users.info({user: userSlackId}, (error, slackUser) => {
      if (error) console.log(`couldnt fetch user`);
      else {
        asyncProjectEntries(slackUser, channelName , startDate, endDate)
          .then(entries => console.log(entries))
      }
    })
  })
}
