const http = require('http')
const querystring = require('querystring')
const url = require('url')

const server = http.createServer((req, res) => {
  // TODO: Implement this function
  const parsedUrl = url.parse(req.url, true)
  const method = req.method
  const path = parsedUrl.pathname
  const query = parsedUrl.query

  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('data', () => {
    const parsedBody = querystring.parse(body)
    const responseObj = {
      method,
      path,
      query,
      body: parsedBody,
    }

    if (method !== 'POST') {
      delete responseObj.body
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(responseObj))
  })
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

module.exports = { server }
