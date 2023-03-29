import { ReactElement } from 'react'
// eslint-disable-next-line import/no-internal-modules
import { renderToStaticMarkup } from 'react-dom/server'

const dataUri = 'data:image/svg+xml,'

export const encodeSvg = (reactElement: ReactElement, color?: string) => {
  const svgString = renderToStaticMarkup(reactElement)

  const doc = new DOMParser().parseFromString(svgString, 'text/html')
  const svgElement = doc.getElementsByTagName('svg')[0]
  if (svgElement) {
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgElement.setAttribute('height', '100')
    svgElement.style.fill = color ?? 'black'
  }

  return `${dataUri}${window.encodeURIComponent(svgElement.outerHTML)}`
}

export const parseModuleType = (queries?: string[]) => {
  let type
  if (queries) {
    for (let i = 0; i < queries.length; i++) {
      if (queries[i].includes('archivist')) {
        type = 'archivist'
        break
      }
      if (queries[i].includes('diviner')) {
        type = 'diviner'
        break
      }
      if (queries[i].includes('node')) {
        type = 'node'
        break
      }
      type = 'module'
    }
    return type
  }
}
