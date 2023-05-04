import { useAsyncEffect } from '@xylabs/react-async-effect'
import { XyoBowserSystemInfoWitness, XyoBowserSystemInfoWitnessConfigSchema } from '@xyo-network/bowser-system-info-plugin'
import { NodeWrapper } from '@xyo-network/node'
import { MemoryNodeBuilder } from '@xyo-network/react-standard-node'
import { WitnessWrapper } from '@xyo-network/witness'
import { useState } from 'react'

const SampleNodeModuleNames = ['Node', 'MemoryArchivist', 'Bridge', 'SystemInfoWitness'] as const

export type SampleNodeModuleNames = (typeof SampleNodeModuleNames)[number]

export type SampleNodeModules = Partial<Record<SampleNodeModuleNames, string>>

const buildSystemInfoWitness = async () => {
  const sysInfoWitness = await XyoBowserSystemInfoWitness.create({
    config: { name: 'SystemInfoWitness', schema: XyoBowserSystemInfoWitnessConfigSchema },
  })
  return WitnessWrapper.wrap(sysInfoWitness)
}

export const useBuildSampleNode = (sampleModules: SampleNodeModules, apiDomain?: string) => {
  const [node, setNode] = useState<NodeWrapper>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        if ('Node' in sampleModules) {
          const nodeBuilder = await MemoryNodeBuilder.create({ name: 'Node' })
          if ('MemoryArchivist' in sampleModules) await nodeBuilder.addArchivistMemory('MemoryArchivist')
          if ('Bridge' in sampleModules && apiDomain) await nodeBuilder.addBridge(apiDomain)
          if ('SystemInfoWitness' in sampleModules) await nodeBuilder.attach(await buildSystemInfoWitness(), true)

          setNode(nodeBuilder.wrappedNode)
        }
      } catch (e) {
        console.error('Error building sample node', e, sampleModules, apiDomain)
      }
    },
    [sampleModules, apiDomain],
  )

  return node
}
