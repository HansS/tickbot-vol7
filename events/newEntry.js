import tr from '../lib/requests'

export default ({taskId, userId, hours, notes}) => {
  const [formatedDate] = new Date().toISOString().split('T'),
    entry = {
      'date': formatedDate,
      'hours': hours,
      'notes': notes,
      'task_id': taskId,
      'user_id': userId
    }

  return new Promise((resolve, reject) => {
    tr({method: 'POST', path: 'entries.json', data: entry})
      .then(entry => resolve(entry))
      .catch(error => reject(error))
    })
}
