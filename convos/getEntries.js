import getEntries from '../events/getEntries'
import getUsers from '../events/getUsers'
// import getUserFromSlackId from '../lib/helpers'

export default (response, convo, bot) => {
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
      userSlackId = convo.source_message.user

    bot.api.users.info({user: userSlackId}, (error, slackUser) => {
      if (error) console.log(`couldnt fetch user`)
      else {
        getUsers()
          .then(tickUsers => tickUsers.filter(tickUser => tickUser.profile.last_name === slackUser.last_name)[0])
          .then(user => getEntries({userId: user.id, startDate: startDate, endDate: endDate}))
          .then(entries => console.log(entries))
      }
    })
  })
}
