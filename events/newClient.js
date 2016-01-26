import tr from '../lib/requests'

export default function newClient({name}) {
  const client = {
    'name': name,
    'archive': false
  }
  return new Promise((resolve, reject) => {
    tr({method:'POST', path: 'clients', data: client})
      .then(client => resolve(client))
      .catch(error => reject(error))
  })
}
