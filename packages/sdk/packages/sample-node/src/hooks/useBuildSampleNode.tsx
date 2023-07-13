import { useAsyncEffect } from '@xylabs/react-async-effect'
import { BowserSystemInfoWitness, BowserSystemInfoWitnessConfigSchema } from '@xyo-network/bowser-system-info-plugin'
import { NodeInstance } from '@xyo-network/node'
import { MemoryNodeBuilder } from '@xyo-network/react-standard-node'
import { useState } from 'react'

export const SampleNodeModuleNames = ['Node', 'MemoryArchivist', 'Bridge', 'SystemInfoWitness'] as const

export type SampleNodeModuleNames = (typeof SampleNodeModuleNames)[number]

export type SampleNodeModules = Partial<Record<SampleNodeModuleNames, string>>

const buildSystemInfoWitness = async (moduleName?: string) => {
  const sysInfoWitness = await BowserSystemInfoWitness.create({
    config: { name: moduleName, schema: BowserSystemInfoWitnessConfigSchema },
  })
  return sysInfoWitness
}

export const useBuildSampleNode = (sampleModules: SampleNodeModules, apiDomain?: string) => {
  const [node, setNode] = useState<NodeInstance>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        if ('Node' in sampleModules) {
          const nodeBuilder = await MemoryNodeBuilder.create({ name: sampleModules.Node })
          if ('MemoryArchivist' in sampleModules) await nodeBuilder.addArchivistMemory(sampleModules.MemoryArchivist)
          if ('Bridge' in sampleModules && apiDomain) await nodeBuilder.addBridge(apiDomain, sampleModules.Bridge)
          if ('SystemInfoWitness' in sampleModules) await nodeBuilder.attach(await buildSystemInfoWitness(sampleModules.SystemInfoWitness), true)

          setNode(nodeBuilder.node)
        }
      } catch (e) {
        console.error('Error building sample node', e, sampleModules, apiDomain)
      }
    },
    [sampleModules, apiDomain],
  )

  return node
}
