export const getHashFromUri = (uri: string) => {
  const uriParts = uri.split('/')
  let partFound: string | undefined = undefined
  uriParts.forEach((part) => {
    if (part.length === 64) {
      partFound = part
    }
  })
  return partFound
}
