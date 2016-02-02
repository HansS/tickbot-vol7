// import { getChannelFromId, getProjectIdFromName } from '../lib/helpers'
import bot from '../index'
import getProjects from '../events/getProjects'
import newTask from '../events/newTask'

export default (response, convo) => {
  convo.ask(`Whats your task?`, (response, convo) => {
    convo.say(`Awesome.`)
    convo.ask(`And how many hours will it take?`, (response, convo) => {
      convo.say(`Sounds good, now get to work!`)
      convo.next()
    })
    convo.next()
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses(),
      taskName = reponses[Object.keys(reponses)[0]],
      taskBudget = reponses[Object.keys(reponses)[1]],
      channelId = convo.sent[0].channel

    bot.api.channels.info({channel: channelId}, (error, channel) => {
      if (error) console.log(`couldnt fetch channel`)
      else {
        const channelName = channel.channel.name
        getProjects()
          .then(projects => projects.filter(project => project.name === channelName)[0])
          .then(project => newTask({ name: taskName, budget: taskBudget, projectId: project.id }))
      }
    })
  })
}
