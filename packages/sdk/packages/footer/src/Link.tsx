import type { LinkExProps } from '@xylabs/react-link'
import { LinkEx } from '@xylabs/react-link'
import { assertEx } from '@xylabs/sdk-js'
import React from 'react'

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

export const FooterLink: React.FC<LinkExProps> = ({
  target, to, toOptions, href, margin = 0.5, variant = 'body2', ...props
}) => {
  if (href) {
    const url = new URL(assertEx(href, () => 'href not set'))
    assertEx(url.hostname, () => 'Hostname is required in href')
    const convertedUrl = convertToBetaIfNeeded(url)
    if (document.location.hostname === convertedUrl.hostname) {
      const to = url.search.length > 0 ? `${convertedUrl.pathname}${convertedUrl.search}` : url.pathname
      return <LinkEx margin={margin} to={to} toOptions={toOptions} target={target} variant={variant} {...props} />
    } else {
      return <LinkEx margin={margin} href={href} target={target ?? '_blank'} variant={variant} {...props} />
    }
  } else {
    return <LinkEx margin={margin} to={to} toOptions={toOptions} target={target} variant={variant} {...props} />
  }
}
