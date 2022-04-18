import { asyncHandler } from '@xylabs/sdk-api-express-ecs'
import { readFile } from 'fs/promises'
import { join } from 'path'

import { getAdjustedPath } from '../../lib'
import { MountPathAndMiddleware } from '../../types'

// TODO: Pass in
const dirName = './build'

const handler = asyncHandler(async (req, res) => {
  const adjustedPath = getAdjustedPath(req)
  res.send(await readFile(join(dirName, adjustedPath)))
})

/**
 * Middleware to proxy the original response without any modification
 */
export const proxyOriginal: MountPathAndMiddleware = ['get', ['*', handler]]
