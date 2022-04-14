import express from 'express'

import { setMetadataForArchivistBlock } from '../middleware'
import { MountPathAndMiddleware } from '../types'

const server = (port = 80) => {
  const app = express()
  app.set('etag', false)

  const requestHandlers: MountPathAndMiddleware[] = [setMetadataForArchivistBlock]
  // TODO: Add default pass through handler last here
  // requestHandlers.push(defaultHandler)
  for (const handler of requestHandlers) {
    app[handler[0]](...handler[1])
  }
  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
  server.setTimeout(3000)
}

export { server }
