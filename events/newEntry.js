import tr from '../lib/requests'

export default ({taskId, hours, notes}) => {
  const currentDate = new Date(),
    formatedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`,
    entry = {
      'date': formatedDate,
      'hours': hours,
      'notes': notes,
      'task_id': taskId
    }

  tr({method: 'POST', path: 'entries.json', data: entry})
    .then(data => { console.log(data) })
    .catch(error => { console.error(error) })
}
