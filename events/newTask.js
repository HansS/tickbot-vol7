import tr from '../lib/requests'

export default function newTask({projectId, name, budget}) {
  const task = {
    'name': name,
    'budget': budget,
    'project_id': projectId,
    'billable': false
  }

  return new Promise((resolve, reject) => {
    tr({method: 'POST', path: 'tasks', data: task})
      .then(task => resolve(task))
      .catch(error => reject(error))
  })
}
