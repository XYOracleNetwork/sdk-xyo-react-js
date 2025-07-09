/** @public */
export const colorParser = (conditional?: boolean | null) => {
  switch (conditional) {
    case true: {
      return 'success'
    }
    case false: {
      return 'error'
    }
    default: {
      return
    }
  }
}
