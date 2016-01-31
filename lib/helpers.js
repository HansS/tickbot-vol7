import getProjects from '../events/getProjects'
import getTasks from '../events/getTasks'

const getProjectIdFromName = channelName => new Promise((resolve, reject) => {
  getProjects()
    .then(projects => projects.filter(project => project.name === channelName)[0])
    .then(project => resolve(project.id))
})

const getTaskIdFromName = taskName => new Promise((resolve, reject) => {
  getTasks()
    .then(tasks => tasks.filter(task => task.name === taskName)[0])
    .then(task => resolve(task.id))
})

const getChannelFromId = id => new Promise((resolve, reject) => {
  bot.api.channels.info({channel: id}, (error, channel) => {
    (channel) ? resolve(channel.channel) : reject(error)
  })
})

const getUserFromSlackId = id => new Promise((resolve, reject) => {
  bot.api.users.info({user: id}, (error, user) => {
    (user) ? resolve(user.profile) : reject(error)
  })
})

export { getProjectIdFromName, getTaskIdFromName, getChannelFromId, getUserFromSlackId }
