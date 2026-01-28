import { isUndefinedOrNull } from '@xylabs/sdk-js'

export const appendSvg = (iconSrc?: string, container?: HTMLElement | null) => {
  if (isUndefinedOrNull(iconSrc) || isUndefinedOrNull(container)) return null
  const parser = new DOMParser()

  const fragment = parser.parseFromString(iconSrc, 'text/html').body.childNodes[0]
  container.append(fragment)
}
