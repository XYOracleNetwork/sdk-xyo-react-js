import { customPoweredByHeader, disableExpressDefaultPoweredByHeader } from '@xylabs/sdk-api-express-ecs'
import { Express } from 'express'

export const addMiddleware = (app: Express) => {
  app.set('etag', false)
  disableExpressDefaultPoweredByHeader(app)
  app.use(customPoweredByHeader)
}
