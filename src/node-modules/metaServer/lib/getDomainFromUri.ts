import { URL } from 'url'
export const getDomainFromUri = (uri: string) => {
  const parsed = new URL(uri)
  return `${parsed.protocol}//${parsed.host}`
}
