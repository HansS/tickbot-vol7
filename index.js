import 'babel-core/register';

import mongoose from 'mongoose';
import Botkit from 'botkit';

import config from './config';
import newEntryConvo from './convos/newEntry';
import newTimedEntryConvo from './convos/newTimedEntry';
import getEntriesConvo from './convos/getEntries';
import getProjectEntriesConvo from './convos/getProjectEntries';

import User from './models/user';
import Project from './models/project';

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => { throw new Error(`Unable to connect to database: ${config.db}`)});

const controller = Botkit.slackbot({ debug: false });
const bot = controller.spawn({ token: config.slackToken }).startRTM(e => (e) ? throw new Error(`Could not spawn bot: ${e}`) : console.log(`Live!`));

controller.on(`channel_joined`, (bot, message) => { /* eslint no-shadow: 0 */
  const name = message.channel.name;
  const project = new Project({ name });

  project.save()
    .then(project => console.log('made project'))
    .catch(e => console.log(e));
});

controller.hears([`^new entry`], `direct_mention`, (bot, message) => bot.startConversation(message, newEntryConvo));
controller.hears([`^new entry start timer`], `direct_mention`, (bot, message) => bot.startConversation(message, newTimedEntryConvo));
controller.hears([`^get entries`], `direct_mention`, (bot, message) => bot.startConversation(message, getProjectEntriesConvo));
controller.hears([`^get entries`], `direct_message`, (bot, message) => bot.startConversation(message, getEntriesConvo));

export default bot;
