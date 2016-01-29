import 'babel-core/register'

import dotenv from 'dotenv'
import Botkit from 'botkit'

import newClient from './events/newClient'
import newProject from './events/newProject'
import newTask from './events/newTask'
import newEntry from './events/newEntry'

import { newTaskConvo, newEntryConvo } from './lib/convos'

dotenv.load()

// TESTS
// newClient({name: `yeeeehawwww`})
// newProject({name: `make salunch`, clientId: 281079, budget: 3})


const listeners = [`direct_message`, `direct_mention`],
  controller = Botkit.slackbot({debug: false}),
  bot = controller.spawn({token: process.env.SLACKTOKEN}).startRTM(err => {
    (err) ? console.error(`Could not spawn bot: ${err}`) : console.log(`Live!`)
  })


controller.on(`channel_joined`, (bot, message) => {
  const projectName = message.channel.name,
    [clientName, projectBudget] = message.channel.purpose.value.split(`:`)

  // TODO: create tasks described in the chan desc(perhaps loop/recursive)
  newClient({name: clientName})
    .then(client => newProject({name: projectName, clientId: client.id, budget: projectBudget}))
    // .then(project => newTask({name: taskName, projectId: project.id, budget: 4}))
})

controller.hears([`^new task`], listeners, (bot, message) => bot.startConversation(message, newTaskConvo))
controller.hears([`^new entry`], listeners, (bot, message) => bot.startConversation(message, newEntryConvo))
