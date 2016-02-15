import bot from '../index';
import getProjects from '../events/getProjects';
import newTask from '../events/newTask';

export default (response, convo) => {
  convo.ask(`Whats your task?`, (response, convo) => {
    convo.say(`Awesome.`);
    convo.ask(`And how many hours will it take?`, (response, convo) => {
      convo.say(`Sounds good, now get to work!`);
      convo.next();
    });
    convo.next();
  });
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses();
    const taskName = reponses[Object.keys(reponses)[0]];
    const taskBudget = reponses[Object.keys(reponses)[1]];
    const channelId = convo.source_message.channel;

    bot.api.channels.info({ channel: channelId }, (error, channel) => {
      if (error) console.log(`couldnt fetch channel`);
      else {
        const channelName = channel.channel.name;
        getProjects()
          .then(projects => projects.filter(project => project.name === channelName)[0])
          .then(project => newTask(taskName, taskBudget, project.id))
          .then(task => bot.say({ text: `Task submitted`, channel: channelId }))
          .catch(error => bot.say({ text: `Error submitting task`, channel: channelId }))
      }
    });
  });
};
