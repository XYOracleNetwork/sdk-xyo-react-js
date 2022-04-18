import { asyncHandler } from '@xylabs/sdk-api-express-ecs'
// import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'

import { getAdjustedPath } from '../../lib'
import { ApplicationMiddlewareOptions, MountPathAndMiddleware } from '../../types'
import { setHtmlMetaData } from './setHtmlMetaData'

const getHandler = (baseDir: string) => {
  const defaultHtmlMeta = {}

  // TODO: statFileSync, if file containing standard HTML meta
  // exists use it otherwise use defaults here
  /*
  try {
    defaultHtmlMeta = JSON.parse(readFileSync(join(baseDir, 'meta.json'), { encoding: 'utf-8' }) ?? '{}')
  } catch (ex) {
    console.warn('No config found!  Please create a config at meta.json file in your ./build folder')
  }
  */

  return asyncHandler(async (req, res, next) => {
    const adjustedPath = getAdjustedPath(req)
    if (defaultHtmlMeta && extname(adjustedPath) === '.html') {
      const html = await readFile(join(baseDir, 'index.html'), { encoding: 'utf-8' })
      const updatedHtml = await setHtmlMetaData(
        `${req.protocol}://${req.headers.host}${req.url}`,
        html,
        defaultHtmlMeta
      )
      res.send(updatedHtml)
    } else {
      next()
    }
  })
}

/**
 * Middleware for augmenting HTML metadata for Archivist Blocks
 */
export const configureArchivistBlock = <T extends ApplicationMiddlewareOptions>(opts: T): MountPathAndMiddleware => [
  'get',
  ['*', getHandler(opts.baseDir)],
]
