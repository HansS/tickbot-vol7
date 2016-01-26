import getProjects from '../events/getProjects'
import getTasks from '../events/getTasks'

const getProjectIdFromName = (channelName) => {
  return new Promise((resolve, reject) => {
    getProjects()
      .then(projects => projects.filter((project) => project.name === channelName)[0])
      .then(project => resolve(project.id))
  })
}

const getChannelFromId = (id) => {
  return new Promise((resolve, reject) => {
    bot.api.channels.info({channel: id}, (error, channel) => {
      (channel) ? resolve(channel.channel) : reject(error)
    })
  })
}

const getTaskIdFromName = (taskName) => {
  return new Promise((resolve, reject) => {
    getTasks()
      .then(tasks => tasks.filter((task) => task.name === taskName)[0])
      .then(task => resolve(task.id))
  })
}


export { getProjectIdFromName, getChannelFromId, getTaskIdFromName }
