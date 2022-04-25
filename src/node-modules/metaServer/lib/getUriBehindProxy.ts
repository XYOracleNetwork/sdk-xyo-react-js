import { Request } from 'express'

import { isLocalhost } from './isLocalhost'

/**
 * Since we're often operating behind both CloudFront & an ALB, within
 * a container, the original URI requested can often be hard to determine.
 * We could setup CloudFront/ALB/Express to parse all the associated
 * X-Forwarded-For/Protocol/etc. headers but they can often be spoofed.
 * This simple method just assumes HTTPS if not local, and as such we
 * can trust the host header which CloudFront is setup to forward for us.
 * @param req
 * @returns
 */
export const getUriBehindProxy = (req: Request) => {
  const host = process.env.PUBLIC_ORIGIN || req.headers.host || '127.0.0.1'
  const parsedHost = isLocalhost(host) ? host : host?.split(':')?.[0]
  const scheme = isLocalhost(host) ? 'http' : 'https'
  const url = req.url
  return `${scheme}://${parsedHost}${url}`
}
