import { Express } from 'express'

import { configureArchivistBlock, configureProxyOriginal } from '../contentHandlers'
import { ApplicationMiddlewareOptions, MountPathAndMiddleware } from '../types'

export const addContentHandlers = (app: Express, opts: ApplicationMiddlewareOptions) => {
  const knownRequestTypeHandlers: MountPathAndMiddleware[] = [configureArchivistBlock(opts)]
  // Add catch-all pass-through handler last to ensure
  // all unknown/unsupported requests are simply proxied
  knownRequestTypeHandlers.push(configureProxyOriginal(opts))
  for (const handler of knownRequestTypeHandlers) {
    app[handler[0]](...handler[1])
  }
}
