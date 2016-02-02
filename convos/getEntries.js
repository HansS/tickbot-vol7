import bot from '../index'
import getEntries from '../events/getEntries'
import getUsers from '../events/getUsers'

export default (response, convo) => {
  convo.ask(`Retieve project entries starting from which date? (2014-09-02)`, (response, convo) => {
    convo.ask(`Until? (2014-10-02)`, (response, convo) => {
      convo.next()
    })
    convo.next()
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses(),
      startDate = reponses[Object.keys(reponses)[0]],
      endDate = reponses[Object.keys(reponses)[1]],
      userSlackId = convo.source_message.user,
      channelId = convo.source_message.channel

    bot.api.users.info({user: userSlackId}, (error, slackUser) => {
      if (error) console.log(`couldnt fetch user`)
      else {
        getUsers()
          .then(tickUsers => tickUsers.filter(tickUser => tickUser.last_name === slackUser.user.profile.last_name)[0])
          .then(user => getEntries({userId: user.id, startDate: startDate, endDate: endDate}))
          .then(entries => {
            let sum = 0
            for (let entry of entries) {
              sum += entry.hours
            }
            bot.say({text: `Total of ${sum} hours logged between ${startDate} and ${endDate}`, channel: channelId})
        })
      }
    })
  })
}
