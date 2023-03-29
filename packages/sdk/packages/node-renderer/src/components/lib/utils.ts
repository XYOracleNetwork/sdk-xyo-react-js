import { ReactElement } from 'react'
// eslint-disable-next-line import/no-internal-modules
import { renderToStaticMarkup } from 'react-dom/server'

const dataUri = 'data:image/svg+xml,'

export const encodeSvg = (reactElement: ReactElement) => {
  const svgString = renderToStaticMarkup(reactElement)
  // add xmls attribute for data-uri support
  const validSvg = svgString
    .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" height="100" ')
    .replace('viewbox="0 0 24 24', 'viewbox="0 0 100 100"')
  return `${dataUri}${window.encodeURIComponent(validSvg)}`
}
