import tr from '../lib/requests'

export default ({projectId, name, budget}) => {
  const task = {
    'name': name,
    'budget': budget,
    'project_id': projectId,
    'billable': false
  }

  return new Promise((resolve, reject) => {
    tr({method: 'POST', path: 'tasks.json', data: task})
      .then(task => resolve(task))
      .catch(error => reject(error))
  })
}
