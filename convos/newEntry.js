import bot from '../index'
import newEntry from '../events/newEntry'
import getTasks from '../events/getTasks'
import getUsers from '../events/getUsers'

async function postEntry(slackUser, taskName, hours, notes) {
  const tickUsers = await getUsers(),
    tasks = await getTasks(),
    user = tickUsers.filter(tickUser => tickUser.last_name === slackUser.user.profile.last_name)[0],
    task = tasks.filter(task => task.name === taskName)[0]

  return newEntry({ taskId: task.id, userId: user.id, hours: hours, notes: notes })
}

export default (response, convo) => {
  convo.ask(`What task is this entry for?`, (response, convo) => {
    convo.say(`Awesome.`)
    convo.ask(`And how many hours did it take?`, (response, convo) => {
      convo.ask(`Any notes to add?`, (response, convo) => {
        convo.next()
      })
      convo.next()
    })
    convo.next()
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses(),
      taskName = reponses[Object.keys(reponses)[0]],
      hours = reponses[Object.keys(reponses)[1]],
      notes = reponses[Object.keys(reponses)[2]],
      userSlackId = convo.source_message.user,
      channelId = convo.sent[0].channel

    bot.api.users.info({user: userSlackId}, (error, slackUser) => {
      if (error) console.log(`couldnt fetch user`)
      postEntry(slackUser, taskName, hours, notes)
        .then(entry => console.log(entry))
        .catch(error => console.log(error))
    })
  })
}
