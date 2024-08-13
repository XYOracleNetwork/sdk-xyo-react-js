import { ReactElement } from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { renderToStaticMarkup } from 'react-dom/server'

const dataUri = 'data:image/svg+xml,'

export const encodeSvg = (reactElement: ReactElement, color?: string) => {
  const svgString = renderToStaticMarkup(reactElement)

  const doc = new DOMParser().parseFromString(svgString, 'text/html')
  const svgElement = doc.querySelectorAll('svg')[0]
  if (svgElement) {
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgElement.setAttribute('height', '100')
    svgElement.style.fill = color ?? 'black'
  }

  return `${dataUri}${window.encodeURIComponent(svgElement.outerHTML)}`
}
