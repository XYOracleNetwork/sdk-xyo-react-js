export const findParent = (tagName: string, element: HTMLElement | null = null) => {
  let currentElement = element
  while (currentElement) {
    if (currentElement.tagName.toLowerCase() === tagName.toLowerCase()) {
      return currentElement
    } else {
      currentElement = currentElement.parentElement
    }
  }
}
