import { RequestHandler } from 'express'

// TODO: Import type from express-serve-static-core if it's exported
export type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
export type ApplicationMiddleware = [path: string, handler: RequestHandler]
export type MountPathAndMiddleware = [method: Method, middleware: ApplicationMiddleware]
