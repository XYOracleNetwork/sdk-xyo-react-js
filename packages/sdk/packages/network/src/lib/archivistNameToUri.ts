import { archivistPresets } from './archivistPresets'

export const archivistUriToName = () => {
  return archivistPresets.reduce<Record<string, string>>((acc, { name, uri }) => {
    if (name) {
      acc[uri] = name
    }
    return acc
  }, {})
}
