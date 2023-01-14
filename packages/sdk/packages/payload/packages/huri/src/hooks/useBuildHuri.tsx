import { useNetwork } from '@xyo-network/react-network'

export const useBuildHuri = (hash?: string) => {
  const { network } = useNetwork()
  const networkUri = network?.nodes?.find((node) => node.type === 'archivist')?.uri

  if (!hash || hash.startsWith('http')) {
    return
  }

  return `${networkUri}/${hash}`
}
