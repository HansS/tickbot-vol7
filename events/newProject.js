import tr from '../lib/requests'

export default ({clientId, name, budget}) => {
  const project = {
    'name': name,
    'budget': budget,
    'notifications': false,
    'billable': true,
    'recurring': false,
    'client_id': clientId,
    'owner_id': 245247
  }

  return new Promise((resolve, reject) => {
    tr({method: 'POST', path: 'projects.json', data: project})
      .then(project => resolve(project))
      .catch(error => reject(error))
    })
}
