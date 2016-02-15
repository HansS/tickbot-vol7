import tr from '../lib/requests';

export default ({ project_id, name, budget }) => {
  const task = {
    name,
    budget,
    project_id,
    billable: false,
  };

  return new Promise((resolve, reject) => {
    tr({ method: 'POST', path: 'tasks.json', data: task })
      .then(task => resolve(task))
      .catch(e => reject(e));
  });
};
