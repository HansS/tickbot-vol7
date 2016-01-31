import getTaskIdFromName from '../lib/helpers'
import getEntries from '../events/getEntries'
import getProjectIdFromName from '../lib/helpers'

export default (response, convo) => {
  convo.ask(`Retieve project entries starting from which date? (2014-09-02)`, (response, convo) => {
    convo.ask(`Until? (2014-10-02)`, (response, convo) => convo.next())
    convo.next()
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses(),
      startDate = reponses[Object.keys(reponses)[1]],
      endDate = reponses[Object.keys(reponses)[1]],
      channelId = convo.sent[0].channel,
      userId = 1337

    getChannelFromId(channelId) // fetching project name to search for matching projectId then we have all params for newTask
      .then(channel => getProjectIdFromName(channel.name))
      .then(projectId => getEntries({userId : userId, projectId : projectId, startDate : startDate, endDate : endDate}))
      .then(entries => console.log(entries))
  })
}
