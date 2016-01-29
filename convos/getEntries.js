import getTaskIdFromName from '../lib/helpers'
import newEntry from '../events/newEntry'

export default (response, convo) => {
  convo.ask(`What task is this entry for?`, (response, convo) => {
    convo.say(`Awesome.`)
    convo.ask(`And how many hours did it take?`, (response, convo) => {
      convo.say(`Well then, time to celebrate!`)
      convo.ask(`Any notes to add?`, (response, convo) => {
        convo.next()
      })
      convo.next()
    })
    convo.next()
  })
  convo.on(`end`, convo => {
    console.log(`done convo!!111!`) // TODO: refactor maybe to --> for (const response in reponses) { console.log(`${response} ${reponses[response]}`); }
    const reponses = convo.extractResponses(),
      taskName = reponses[Object.keys(reponses)[1]],
      hours = reponses[Object.keys(reponses)[1]],
      notes = reponses[Object.keys(reponses)[2]],
      channelId = convo.sent[0].channel

    getTaskIdFromName(taskName)
      .then(task => newEntry({ taskId: task.id, hours: hours, notes: notes }))
  })
}
