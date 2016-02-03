import getTaskIdFromName from '../lib/helpers'
import getProjectEntries from '../events/getEntries'
import getProjects from '../events/getProjects'

async function getProjectEntries(slackUser, channelName, startDate, endDate) {
  const tickUsers = await getUsers(),
    projects = getProjects(),
    user = tickUsers.filter(tickUser => tickUser.last_name === slackUser.user.profile.last_name)[0],
    project = projects.filter(project => project.name === channelName)[0]

  return getProjectEntries({ userId: user.id, projectId: project.id, startDate: startDate, endDate: endDate })
}

export default (response, convo) => {
  convo.ask(`Retieve project entries starting from which date? (yyyy-mm-dd)`, (response, convo) => {
    convo.ask(`Until?`, (response, convo) => {
      convo.next()
    })
    convo.next()
  })
  convo.on(`end`, convo => {
    const reponses = convo.extractResponses(),
      startDate = reponses[Object.keys(reponses)[0]],
      endDate = reponses[Object.keys(reponses)[1]],
      userSlackId = convo.source_message.user,
      channelId = convo.source_message.channel,
      channelName = channel.channel.name

    bot.api.users.info({user: userSlackId}, (error, slackUser) => {
      if (error) console.log(`couldnt fetch user`)
      else {
        getProjectEntries(slackUser, channelName , startDate, endDate)
        .then(entries => console.log(entries))
      }
    })
  })
}
