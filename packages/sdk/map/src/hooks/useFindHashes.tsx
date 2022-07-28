import { useNetwork, XyoArchivistPreset } from '@xyo-network/react-network'

const parseStaticAnswerHash = () => {
  return 'c7bbf61f61cfd4a1b2def160c28136fc1d100d39fbdb67b227a2c6e558d9d3a5'
}

const useFindHashes = () => {
  const { network } = useNetwork()
  const exploreMapHashes = (network?.nodes?.find((node) => node.type === 'archivist') as XyoArchivistPreset)?.explorerMapHashes
  const animatedAnswerHashes = exploreMapHashes?.animatedAnswerHashes || []
  const staticAnswerHash = exploreMapHashes?.staticAnswerHash || parseStaticAnswerHash()

  return [staticAnswerHash, ...animatedAnswerHashes]
}

export { useFindHashes }
