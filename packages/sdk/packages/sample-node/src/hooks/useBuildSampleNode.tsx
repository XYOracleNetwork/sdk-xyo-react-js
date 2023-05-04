import { useAsyncEffect } from '@xylabs/react-async-effect'
import { NodeWrapper } from '@xyo-network/node'
import { MemoryNodeBuilder } from '@xyo-network/react-standard-node'
import { useState } from 'react'

type SampleNodeModules = 'MemoryArchivist' | 'Bridge' | 'SystemInfoWitness'

export const useBuildSampleNode = (sampleModules: SampleNodeModules[] = [], nodeModuleName = 'Node', apiDomain?: string) => {
  const [node, setNode] = useState<NodeWrapper>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const nodeBuilder = await MemoryNodeBuilder.create({ name: nodeModuleName })
      if (sampleModules.includes('MemoryArchivist')) await nodeBuilder.addArchivistMemory('Archivist')
      if (sampleModules.includes('Bridge') && apiDomain) await nodeBuilder.addBridge(apiDomain)

      setNode(nodeBuilder.wrappedNode)
    },
    [sampleModules, apiDomain, nodeModuleName],
  )

  return node
}
