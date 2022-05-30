export const getSmallestParentWidth = (element: HTMLElement, maxDepth = 4) => {
  let currentElement: HTMLElement | null = element?.parentElement
  let width = currentElement?.clientWidth ?? screen.width
  let maxDepthCounter = maxDepth
  while (currentElement && maxDepthCounter > 0) {
    if (width > currentElement.getBoundingClientRect()?.['width']) {
      width = currentElement.getBoundingClientRect()?.['width']
    }
    currentElement = currentElement.parentElement
    maxDepthCounter--
  }
  return width
}
