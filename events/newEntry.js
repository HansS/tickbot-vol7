import tr from '../lib/requests';

export default (task_id, user_id, hours, notes) => {
  const [date] = new Date().toISOString().split('T');
  const entry = {
    hours,
    notes,
    user_id,
    task_id,
    date,
  };

  return new Promise((resolve, reject) => {
    tr({ method: 'POST', path: 'entries.json', data: entry })
      .then(entry => resolve(entry))
      .catch(error => reject(error));
  });
};
