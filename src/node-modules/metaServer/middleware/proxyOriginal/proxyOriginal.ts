import serveStatic from 'serve-static'

import { ApplicationMiddlewareOptions, MountPathAndMiddleware } from '../../types'

const getHandler = (baseDir: string) => {
  return serveStatic(baseDir, {})

  // return asyncHandler(async (req, res) => {
  //   const adjustedPath = getAdjustedPath(req)
  //   res.send(await readFile(join(baseDir, adjustedPath)))
  // })
}

/**
 * Middleware to proxy the original response without any modification
 */
export const configureProxyOriginal = <T extends ApplicationMiddlewareOptions>(opts: T): MountPathAndMiddleware => [
  'get',
  ['*', getHandler(opts.baseDir)],
]
