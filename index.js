import 'babel-core/register';

import Botkit from 'botkit';
import config from './config';

import newClient from './events/newClient';
import newProject from './events/newProject';

import newTaskConvo from './convos/newTask';
import newEntryConvo from './convos/newEntry';
import newTimedEntryConvo from './convos/newTimedEntry';
import getEntriesConvo from './convos/getEntries';
import getProjectEntriesConvo from './convos/getProjectEntries';


const controller = Botkit.slackbot({ debug: false });
const bot = controller.spawn({ token: config.slackToken }).startRTM(e =>
  (e) ? console.error(`Could not spawn bot: ${e}`) : console.log(`Live!`));

// TODO: allow admin to set predefined tasks in channel purpose/description
controller.on(`channel_joined`, (bot, message) => { /* eslint no-shadow: 0 */
  const projectName = message.channel.name;
  const [clientName, projectBudget] = message.channel.purpose.value.split(`:`);

  newClient(clientName)
    .then(client => newProject(client.id, projectName, projectBudget));
    // .then(project => {
    //   for (let task of tasks) {
    //     // await newTask({name: task.name, project_id: project.id, budget: task.budget})
    //   }
    // });
});

controller.hears([`^new task`], `direct_mention`, (bot, message) =>
  bot.startConversation(message, newTaskConvo));
controller.hears([`^new entry`], `direct_mention`, (bot, message) =>
  bot.startConversation(message, newEntryConvo));
controller.hears([`^new entry start timer`], `direct_message`, (bot, message) =>
  bot.startConversation(message, newTimedEntryConvo));
controller.hears([`^get entries`], `direct_message`, (bot, message) =>
  bot.startConversation(message, getProjectEntriesConvo));
controller.hears([`^get entries`], `direct_mention`, (bot, message) =>
  bot.startConversation(message, getEntriesConvo));

export default bot;
