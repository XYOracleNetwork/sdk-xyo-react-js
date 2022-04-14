export const getHashFromUri = (uri: string): string | undefined => {
  const uriParts = uri.split('/').map((p) => p.split('?')[0])
  let hash: string | undefined = undefined
  uriParts.forEach((part) => {
    if (part.length === 64) {
      hash = part
    }
  })
  return hash
}
