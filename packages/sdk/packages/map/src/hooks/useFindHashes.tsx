import { ArchivistPreset, useNetwork } from '@xyo-network/react-network'
import { useMemo } from 'react'

const animatedAnswerHashesConst = [
  '79af071f451fc7af10d009dc63236ef9a9b211732c1ee0c06f028fcecf2336c5',
  '531bfba6d8dfefd3bcc888aca54cdbbd4574ed2b3ec551b230845a1f9a608898',
  'c874412b4faa4947de81372fd1ba12fdd6f43f5e408622b7f357cb2bcb3f17cb',
  '29d3f8b882c61a82a1a1675782a27e797ea7196f45a23b4409680ab8b8d5f14e',
  'cfd20f80ac073fd9518f4ef3f43d2a1f5e4e56e40c2677f38d6f6fecd05df60c',
  '1354fa73497519a39aed19fc99bdbae78a880a1eafb2f7898d607e07db36528d',
  '1043b0d25eacfc5013ae9dba780305a6fbf01a43543bd871d7c00537fca142a9',
  '973dfc5df142851ced258d52d0ac2784e814000ac22e35776f772256b0d4dde9',
  '463808eb74d3d87e6563970e0301a493577f8cd1b501e6e0ffa5e027ad2cea95',
  '15b21acea2e3fd9d1ace3768a72636ee7bdf67a6f8e0807bfa2273dea2207555',
  '32d377bfe7ebe382598c54dd13f8af7510e0a1e2fd2e913311fdd58e517e5e2e,',
]

const staticAnswerHashConst = 'c7bbf61f61cfd4a1b2def160c28136fc1d100d39fbdb67b227a2c6e558d9d3a5'

export const useFindHashes = () => {
  const { network } = useNetwork()
  const exploreMapHashes = (network?.nodes?.find((node) => node.type === 'archivist') as ArchivistPreset)?.explorerMapHashes
  const animatedAnswerHashes = exploreMapHashes?.animatedAnswerHashes || animatedAnswerHashesConst
  const staticAnswerHash = exploreMapHashes?.staticAnswerHash || staticAnswerHashConst
  const foundHashes = useMemo(() => [staticAnswerHash, ...animatedAnswerHashes], [animatedAnswerHashes, staticAnswerHash])
  return foundHashes
}
