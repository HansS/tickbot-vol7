import tr from '../lib/requests'

export default ({userId, projectId , startDate, endDate}) => new Promise((resolve, reject) => {
  const [today] = new Date().toISOString().split('T'),
    path = `users/${userId}/entries.json?start_date='${startDate}'&end_date='${endDate}'&billable=true"`

  tr({method: 'GET', path: path})
    .then(projects => resolve(projects))
    .catch(error => reject(error))
})
