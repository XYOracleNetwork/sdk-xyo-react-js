import { archivistPresets } from './archivistPresets'

export const archivistUriToName = () => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return archivistPresets.reduce<Record<string, string>>((acc, { name, uri }) => {
    if (name) {
      acc[uri] = name
    }
    return acc
  }, {})
}
