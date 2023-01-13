import { useNetwork } from '@xyo-network/react-network'

export const useBuildHuri = (hash?: string) => {
  const { network } = useNetwork()
  const networkUri = network?.nodes?.find((node) => node.type === 'archivist')?.uri

  if (!hash) {
    return
  }

  return `${networkUri}/${hash}`
}
