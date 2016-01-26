import tr from '../lib/requests'

export default () => new Promise((resolve, reject) => {
  tr({method: 'GET', path: 'tasks'})
    .then(tasks => resolve(tasks))
    .catch(error => reject(error))
})
