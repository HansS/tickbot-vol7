import tr from '../lib/requests'

export default () => new Promise((resolve, reject) => {
  const [today] = new Date().toISOString().split('T'),
    path = `users/${userId}/entries.json?start_date='${today}'&end_date='${today}'&billable=true"`

  tr({method: 'GET', path: path})
    .then(projects => resolve(projects))
    .catch(error => reject(error))
})
