import tr from '../lib/requests';

export default () => new Promise((resolve, reject) => {
  tr({ method: 'GET', path: 'projects.json' })
    .then(projects => resolve(projects))
    .catch(error => reject(error));
});
