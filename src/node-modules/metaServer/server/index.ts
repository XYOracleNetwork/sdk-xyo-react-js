import express, { Express } from 'express'

import { ApplicationMiddlewareOptions } from '../types'
import { addContentHandlers } from './addContentHandlers'
import { addMiddleware } from './addMiddleware'

export const getApp = (directory = './build'): Express => {
  const opts: ApplicationMiddlewareOptions = { baseDir: directory }
  const app = express()
  addMiddleware(app)
  addContentHandlers(app, opts)
  return app
}

export const server = (port = 80, directory = './build') => {
  const app = getApp(directory)
  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
  server.setTimeout(3000)
  return server
}
