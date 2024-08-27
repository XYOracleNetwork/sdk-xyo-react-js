const validTLDs = new Set(['.xyo'])

export const findXnsNameInUrl = (shareUrl: string): string | undefined => {
  const url = new URL(shareUrl)
  const pathParts = url.pathname.split('/')
  const xnsName = pathParts.find((part) => {
    if (part.includes('.')) {
      const tld = part.split('.').pop()
      return validTLDs.has(`.${tld}`)
    }
  })
  return xnsName
}
