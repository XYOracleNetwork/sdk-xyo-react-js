import express from 'express'
import fs from 'fs'
import path from 'path'

import { setHtmlMetaData } from '../setHtmlMetaData'

const server = (port = 80) => {
  const app = express()
  app.set('etag', false)

  const dirName = './build'
  let config = {}

  try {
    config = JSON.parse(fs.readFileSync(path.join(dirName, 'meta.json')).toString() ?? '{}')
  } catch (ex) {
    console.warn('No config found!  Please creare a config at meta.json file in your ./build folder')
  }

  app.get('*', async (req, res) => {
    const adjustedPath = path.extname(req.path).length > 0 ? path.join(req.path) : path.join(req.path, 'index.html')
    if (config && path.extname(adjustedPath) === '.html') {
      const html = fs.readFileSync(path.join(dirName, 'index.html')).toString()
      const updatedHtml = await setHtmlMetaData(`${req.protocol}://${req.headers.host}${req.url}`, html, config)
      res.send(updatedHtml)
    } else {
      const data = fs.readFileSync(path.join(dirName, adjustedPath))
      res.send(data)
    }
  })

  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })

  server.setTimeout(3000)
}

export { server }
