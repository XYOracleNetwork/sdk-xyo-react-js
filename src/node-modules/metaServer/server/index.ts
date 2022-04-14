import { asyncHandler } from '@xylabs/sdk-api-express-ecs'
import express from 'express'
import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'

import { setHtmlMetaData } from '../middleware'

const server = (port = 80) => {
  const app = express()
  app.set('etag', false)

  const dirName = './build'
  let config = {}

  try {
    config = JSON.parse(readFileSync(join(dirName, 'meta.json'), { encoding: 'utf-8' }) ?? '{}')
  } catch (ex) {
    console.warn('No config found!  Please create a config at meta.json file in your ./build folder')
  }

  app.get(
    '*',
    asyncHandler(async (req, res) => {
      const adjustedPath = extname(req.path).length > 0 ? join(req.path) : join(req.path, 'index.html')
      if (config && extname(adjustedPath) === '.html') {
        const html = await readFile(join(dirName, 'index.html'), { encoding: 'utf-8' })
        const updatedHtml = await setHtmlMetaData(`${req.protocol}://${req.headers.host}${req.url}`, html, config)
        res.send(updatedHtml)
      } else {
        res.send(await readFile(join(dirName, adjustedPath)))
      }
    })
  )

  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })

  server.setTimeout(3000)
}

export { server }
