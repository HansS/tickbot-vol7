import getTaskIdFromName from '../lib/helpers'
import getEntries from '../events/getEntries'

export default (response, convo) => {
  convo.ask(`Retieve project entries starting from which date? (2014-09-02)`, (response, convo) => {
    convo.ask(`Until? (2014-10-02)`, (response, convo) => {
      convo.say(`Well then, time to celebrate!`)
      convo.next()
    })
    convo.next()
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses(),
      startDate = reponses[Object.keys(reponses)[1]],
      endDate = reponses[Object.keys(reponses)[1]],
      channelId = convo.sent[0].channel,
      userId = 1337// TODO: assign tick id to slackusername https://github.com/tick/tick-api/blob/master/sections/users.md

    getEntries({userId = userId, startDate = startDate, endDate = endDate})
      .then(task => newEntry({ taskId: task.id, hours: hours, notes: notes }))
  })
}
