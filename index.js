import 'babel-core/register'

import dotenv from 'dotenv'
import Botkit from 'botkit'

import newClient from './events/newClient'
import newProject from './events/newProject'
import newTask from './events/newTask'
import newEntry from './events/newEntry'
import getEntries from './events/getEntries'

import newTaskConvo from './convos/newTask'
import newEntryConvo from './convos/newEntry'
import getEntryConvo from './convos/getEntries'

dotenv.load()

// TESTS
// newClient({name: `yeeeehawwww`})
// newProject({name: `make salunch`, clientId: 281079, budget: 3})
getEntries().then(entries => console.log(entries))

const controller = Botkit.slackbot({debug: false}),
  bot = controller.spawn({token: process.env.SLACKTOKEN}).startRTM(err => (err) ? console.error(`Could not spawn bot: ${err}`) : console.log(`Live!`))


controller.on(`channel_joined`, (bot, message) => {
  const projectName = message.channel.name,
    [clientName, projectBudget] = message.channel.purpose.value.split(`:`)

  // TODO: create tasks described in the chan desc(perhaps loop/recursive)
  newClient({name: clientName})
    .then(client => newProject({name: projectName, clientId: client.id, budget: projectBudget}))
    // .then(project => newTask({name: taskName, projectId: project.id, budget: 4}))
})

controller.hears([`^new task`], `direct_mention`, (bot, message) => bot.startConversation(message, newTaskConvo))
controller.hears([`^new entry`], `direct_mention`, (bot, message) => bot.startConversation(message, newEntryConvo))
controller.hears([`^get project entries`], `direct_mention`, (bot, message) => bot.startConversation(message, getEntriesConvo))
controller.hears([`^get entries`], `direct_message`, (bot, message) => bot.startConversation(message, getEntriesConvo))
