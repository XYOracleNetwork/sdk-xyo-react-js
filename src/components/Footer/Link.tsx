import { Link, LinkProps } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { LinkToEx } from '@xylabs/sdk-react'

/**
 * @description
 * FooterLink automatically uses a local To if the link is to the current domain
 * If the link is not local, it defaults to target being _blank
 * In the case of 'beta' domains, it navigates correctly
 */

const convertToBetaIfNeeded = (url: string | URL, currentUrl = new URL(document.location.href)) => {
  const urlObj = typeof url === 'string' ? new URL(url) : url
  const currentUrlObj = typeof currentUrl === 'string' ? new URL(currentUrl) : currentUrl
  const currentHostnameParts = currentUrlObj.hostname.split('.')
  const beta = currentHostnameParts.shift() === 'beta'
  if (beta) {
    const currentHostnameWithoutBeta = currentHostnameParts.join('.')
    if (currentHostnameWithoutBeta === urlObj.hostname) {
      urlObj.hostname = currentUrlObj.hostname
    }
  }
  return urlObj
}

export const FooterLink: React.FC<LinkProps> = ({ target, href, margin = 0.5, variant = 'body2', ...props }) => {
  const url = new URL(assertEx(href, 'href not set'))
  assertEx(url.hostname, 'Hostname is required in href')
  const convertedUrl = convertToBetaIfNeeded(url)
  if (document.location.hostname === convertedUrl.hostname) {
    const to = url.search.length > 0 ? `${convertedUrl.pathname}${convertedUrl.search}` : url.pathname
    return <LinkToEx margin={margin} to={to} target={target} variant={variant} {...props} />
  } else {
    return <Link margin={margin} href={href} target={target ?? '_blank'} variant={variant} {...props} />
  }
}
