const hashLength = 64
// TODO: Replace with regex or something more exact than length
export const getHashFromUri = (uri: string): string | undefined => {
  const uriParts = uri.split('/').map((p) => p.split('?')[0])
  let hash: string | undefined = undefined
  uriParts.forEach((part) => {
    if (part?.length === hashLength) {
      hash = part
    }
  })
  return hash
}
