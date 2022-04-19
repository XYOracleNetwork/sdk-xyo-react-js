import { Request } from 'express'
import { extname, join } from 'path'

export const getAdjustedPath = (req: Request): string => {
  return extname(req.path).length > 0 ? join(req.path) : join(req.path, 'index.html')
}
