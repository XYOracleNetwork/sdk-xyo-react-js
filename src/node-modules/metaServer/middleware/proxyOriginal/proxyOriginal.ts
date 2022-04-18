import { asyncHandler } from '@xylabs/sdk-api-express-ecs'
import { readFile } from 'fs/promises'
import { join } from 'path'

import { getAdjustedPath } from '../../lib'
import { MountPathAndMiddleware } from '../../types'

const getHandler = (baseDir: string) => {
  return asyncHandler(async (req, res) => {
    const adjustedPath = getAdjustedPath(req)
    res.send(await readFile(join(baseDir, adjustedPath)))
  })
}

/**
 * Middleware to proxy the original response without any modification
 */
export interface BaseOpts {
  baseDir: string
}

export const configureProxyOriginal = <T extends BaseOpts>(opts: T): MountPathAndMiddleware => [
  'get',
  ['*', getHandler(opts.baseDir)],
]
