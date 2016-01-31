import tr from '../lib/requests'

export default () => new Promise((resolve, reject) => {
  tr({method: 'GET', path: 'users.json'})
    .then(users => resolve(users))
    .catch(error => reject(error))
})
