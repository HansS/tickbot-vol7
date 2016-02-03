import 'babel-core/register'

import dotenv from 'dotenv'
import Botkit from 'botkit'

import newClient from './events/newClient'
import newProject from './events/newProject'
import newTask from './events/newTask'
import newEntry from './events/newEntry'

import newTaskConvo from './convos/newTask'
import newEntryConvo from './convos/newEntry'
import newTimedEntryConvo from './convos/newTimedEntry'
import getEntriesConvo from './convos/getEntries'
import getProjectEntriesConvo from './convos/getProjectEntries'

dotenv.load()

const controller = Botkit.slackbot({debug: false}),
  bot = controller.spawn({token: process.env.SLACKTOKEN}).startRTM(err => (err) ? console.error(`Could not spawn bot: ${err}`) : console.log(`Live!`))

// TODO: allow admin to set predefined tasks in channel purpose/description
controller.on(`channel_joined`, (bot, message) => {
  const projectName = message.channel.name,
    [clientName, projectBudget] = message.channel.purpose.value.split(`:`)

  newClient({name: clientName})
    .then(client => newProject({name: projectName, clientId: client.id, budget: projectBudget}))
    .then(project => for (let task of tasks) {
      await newTask({name: task.name, projectId: project.id, budget: task.budget})
    })
})

controller.hears([`^new task`], `direct_mention`, (bot, message) => bot.startConversation(message, newTaskConvo))
controller.hears([`^new entry`], `direct_mention`, (bot, message) => bot.startConversation(message, newEntryConvo))
controller.hears([`^new entry start timer`], `direct_message`, (bot, message) => bot.startConversation(message, newTimedEntryConvo))
controller.hears([`^get entries`], `direct_message`, (bot, message) => bot.startConversation(message, getEntriesConvo))
controller.hears([`^get project entries`], `direct_mention`, (bot, message) => bot.startConversation(message, getEntriesConvo))

export default bot
