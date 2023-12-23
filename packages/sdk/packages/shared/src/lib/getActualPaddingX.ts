export const parseMeausureString = (measure?: string, absolute?: number) => {
  if (measure !== undefined && measure !== null && measure.length > 0) {
    if (measure.endsWith('px')) {
      return Number.parseFloat(measure.slice(0, Math.max(0, measure.length - 2)))
    } else if (measure.endsWith('%')) {
      if (absolute !== undefined) {
        return (Number.parseFloat(measure.slice(0, Math.max(0, measure.length - 1))) / 100) * absolute
      }
      throw new Error('Error Parsing Measure [missing absolute]')
    } else if (measure.endsWith('vw')) {
      return (Number.parseFloat(measure.slice(0, Math.max(0, measure.length - 2))) / 100) * window.innerWidth
    } else if (measure.endsWith('vh')) {
      return (Number.parseFloat(measure.slice(0, Math.max(0, measure.length - 2))) / 100) * window.innerHeight
    }
    throw new Error(`Error Parsing Measure [${measure}]`)
  }
}

export const parsePadding = (padding: string) => {
  const parts = padding.split(' ')
  switch (parts.length) {
    case 4: {
      return {
        bottom: parts[2],
        left: parts[3],
        right: parts[1],
        top: parts[0],
      }
    }
    case 3: {
      return {
        bottom: parts[2],
        right: parts[1],
        top: parts[0],
      }
    }
    case 2: {
      return {
        bottom: parts[0],
        left: parts[1],
        right: parts[1],
        top: parts[0],
      }
    }
    case 1: {
      return {
        bottom: parts[0],
        left: parts[0],
        right: parts[0],
        top: parts[0],
      }
    }
  }
}

export const getActualPaddingX = (element: HTMLElement) => {
  const padding = parsePadding(window.getComputedStyle(element, null).getPropertyValue('padding'))
  const paddingLeft =
    parseMeausureString(window.getComputedStyle(element, null).getPropertyValue('padding-left') ?? padding?.left, element.clientWidth) ?? 0
  const paddingRight =
    parseMeausureString(window.getComputedStyle(element, null).getPropertyValue('padding-right') ?? padding?.right, element.clientWidth) ?? 0
  return paddingLeft + paddingRight
}
