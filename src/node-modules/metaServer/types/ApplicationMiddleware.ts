import { RequestHandler } from 'express'

// NOTE: It'd be preferable to import this type from express-serve-static-core but it's not exported
export type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
export type ApplicationMiddleware = [path: string, handler: RequestHandler]
export type MountPathAndMiddleware = [method: Method, middleware: ApplicationMiddleware]
export interface ApplicationMiddlewareOptions {
  baseDir: string
}
