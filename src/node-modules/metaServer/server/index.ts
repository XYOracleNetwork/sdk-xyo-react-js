import express from 'express'

import { configureArchivistBlock, configureProxyOriginal } from '../middleware'
import { ApplicationMiddlewareOptions, MountPathAndMiddleware } from '../types'

export const getApp = (directory = './build') => {
  const app = express()
  app.set('etag', false)
  const opts: ApplicationMiddlewareOptions = { baseDir: directory }
  const knownRequestTypeHandlers: MountPathAndMiddleware[] = [configureArchivistBlock(opts)]
  // Add catch-all pass-through handler last to ensure
  // all unknown/unsupported requests are simply proxied
  knownRequestTypeHandlers.push(configureProxyOriginal(opts))
  for (const handler of knownRequestTypeHandlers) {
    app[handler[0]](...handler[1])
  }
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
