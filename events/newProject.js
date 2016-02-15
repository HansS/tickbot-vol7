import tr from '../lib/requests';

export default (client_id, name, budget) => {
  const project = {
    name,
    budget,
    client_id,
    notifications: false,
    billable: true,
    recurring: false,
    owner_id: 245247,
  };

  return new Promise((resolve, reject) => {
    tr({ method: 'POST', path: 'projects.json', data: project })
      .then(project => resolve(project))
      .catch(error => reject(error));
  });
};
