import tr from '../lib/requests'

export default function getProjects() {
  return new Promise((resolve, reject) => {
    tr({method: 'GET', path: 'projects'})
      .then(projects => resolve(projects))
      .catch(error => reject(error))
    })
}
