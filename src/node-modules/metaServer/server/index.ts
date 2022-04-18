import express from 'express'

import { archivistBlock, proxyOriginal } from '../middleware'
import { MountPathAndMiddleware } from '../types'

export const getApp = () => {
  const app = express()
  app.set('etag', false)
  const knownRequestTypeHandlers: MountPathAndMiddleware[] = [archivistBlock]
  // Add catch-all pass-through handler last to ensure
  // all unknown/unsupported requests are simply proxied
  knownRequestTypeHandlers.push(proxyOriginal)
  for (const handler of knownRequestTypeHandlers) {
    app[handler[0]](...handler[1])
  }
  return app
}

export const server = (port = 80) => {
  const app = getApp()
  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
  server.setTimeout(3000)
}
