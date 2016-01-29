import request from 'request'
import dotenv from 'dotenv'

dotenv.load()

export default ({method, path, data}) => {
  let options = {
    url: `https://www.tickspot.com/${process.env.TICKSUBID}/api/v2/${path}.json`,
    method: method,
    headers: {
      'Authorization': `Token token=${process.env.TICKTOKEN}`,
      'User-Agent': `Volume 7 Slackbot (connor.brathwaite@gmail.com)`,
      'Content-Type': `application/json`
    }
  }

  if (method === 'POST') options.body = JSON.stringify(data)

  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) reject(error)
      else resolve(JSON.parse(body))
    })
  })
}
