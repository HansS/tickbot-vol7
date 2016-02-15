import tr from '../lib/requests';

export default (userId, startDate, endDate) => new Promise((resolve, reject) => {
  const [today] = new Date().toISOString().split('T');
  const yesterday = new Date().setDate(tomorrow.getDate() - 1);

  switch (startDate) {
    case 'today':
      startDate = today;
      break;
    case 'yesterday':
      startDate = yesterday;
      break;
  }

  switch (endDate) {
    case 'today':
      endDate = today;
      break;
    case 'yesterday':
      endDate = yesterday;
      break;
  }

  const path = `users/${userId}/entries.json?start_date='${startDate}'&end_date='${endDate}'&billable=true$"`;

  tr({ method: 'GET', path })
    .then(entries => resolve(entries))
    .catch(error => reject(error));
});
