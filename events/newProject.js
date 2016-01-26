import tr from '../lib/requests'

export default function newProject({clientId, name, budget}) {
  const project = {
    'name': name,
    'budget': budget,
    'notifications': false,
    'billable': true,
    'recurring': false,
    'client_id': clientId,
    'owner_id': 3
  }

  return new Promise((resolve, reject) => {
    tr({method: 'POST', path: 'projects', data: project})
      .then(project => resolve(project))
      .catch(error => reject(error))
    })
}
