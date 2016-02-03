import tr from '../lib/requests'

export default ({userId, projectId, startDate, endDate}) => new Promise((resolve, reject) => {
  const [today] = new Date().toISOString().split('T'),
    yesterday = new Date().setDate(tomorrow.getDate() - 1)

  switch (startDate) {
    case 'today':
      startDate = today
      break;
    case 'yesterday':
      startDate = yesterday
      break;
  }

  switch (endDate) {
    case 'today':
      endDate = today
      break;
    case 'yesterday':
      endDate = yesterday
      break;
  }

  const path = `projects/${projectId}/entries.json?start_date='${startDate}'&end_date='${endDate}'&user_id=${userId}&billable=true$"`

  tr({method: 'GET', path: path})
    .then(entries => resolve(entries))
    .catch(error => reject(error))
})
