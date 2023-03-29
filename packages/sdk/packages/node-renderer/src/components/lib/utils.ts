import { ReactElement } from 'react'
// eslint-disable-next-line import/no-internal-modules
import { renderToStaticMarkup } from 'react-dom/server'

export const encodeSvg = (reactElement: ReactElement) => {
  const svgString = renderToStaticMarkup(reactElement)
  const validSvg = `${svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')}`
  const dataUri = 'data:image/svg+xml,'
  return `${dataUri}${window.encodeURIComponent(validSvg)}`
}
