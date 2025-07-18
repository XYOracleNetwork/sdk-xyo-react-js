import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import type { EvmCallWitnessParams } from '@xyo-network/evm-call-witness'
import {
  EvmCallDiviner, EvmCallWitness, EvmCallWitnessConfigSchema,
} from '@xyo-network/evm-call-witness'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import { ManifestWrapper } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import { ModuleFactory } from '@xyo-network/module-model'
import type { ReportEndEventArgs } from '@xyo-network/sentinel-model'
import { asSentinelInstance } from '@xyo-network/sentinel-model'
import { HDWallet } from '@xyo-network/wallet'
import { InfuraProvider } from 'ethers'
import React from 'react'

import { SentinelCard } from './Card.tsx'
import { NftSentinelManifest } from './manifest.ts'

const loadFromManifest = async () => {
  const mnemonic = 'later puppy sound rebuild rebuild noise ozone amazing hope broccoli crystal grief'
  const wallet = await HDWallet.fromPhrase(mnemonic)
  const provider = new InfuraProvider('homestead', process.env.STORYBOOK_INFURA_PROJECT_ID)

  const locator = new ModuleFactoryLocator()
  locator.register(EvmCallDiviner.factory())

  locator.register(
    new ModuleFactory(EvmCallWitness, { providers: () => [provider] } as Partial<EvmCallWitnessParams>),
    { 'network.xyo.evm.interface': 'Erc721' },
  )

  locator.register(
    new ModuleFactory(EvmCallWitness, { providers: () => [provider] } as Partial<EvmCallWitnessParams>),
    { 'network.xyo.evm.interface': 'Erc721Enumerable' },
  )

  locator.register(
    new ModuleFactory(EvmCallWitness, { providers: () => [provider] } as Partial<EvmCallWitnessParams>),
    { 'network.xyo.evm.interface': 'Erc1155' },
  )

  const manifest = new ManifestWrapper(NftSentinelManifest as PackageManifestPayload, wallet, locator)
  const node = await manifest.loadNodeFromIndex(0)
  console.log(`node: ${(await node.resolve()).length}`)
  return node
}

const StorybookEntry = {
  component: SentinelCard,
  parameters: { docs: { page: null } },
  title: 'modules/sentinel/SentinelCard',
} as Meta<typeof SentinelCard>

const NftSentinelTemplate: StoryFn<typeof SentinelCard> = () => {
  const [node] = usePromise(async () => await loadFromManifest(), [])
  const [sentinel] = usePromise(async () => {
    if (node) {
      const sentinel = asSentinelInstance(await node.resolve('NftInfoSentinel'))
      sentinel?.on('reportEnd', (args) => {
        const { inPayloads, outPayloads } = args as ReportEndEventArgs
        console.log(`inPayloads: ${inPayloads?.length}`)
        console.log(`outPayloads: ${outPayloads?.length}`)
      })
      return sentinel
    }
  }, [node])

  const inPayloads = [
    {
      address: '0x562fC2927c77cB975680088566ADa1dC6cB8b5Ea', // Random ERC721
      schema: EvmCallWitnessConfigSchema,
    },
  ]

  return (
    <FlexCol gap={2}>
      <SentinelCard mod={sentinel} inPayloads={inPayloads} />
    </FlexCol>
  )
}

const NftSentinelCard = NftSentinelTemplate.bind({})

const NftTokensSentinelTemplate: StoryFn<typeof SentinelCard> = () => {
  const [node] = usePromise(async () => await loadFromManifest(), [])

  const [tokensSentinel] = usePromise(async () => {
    if (node) {
      const sentinel = asSentinelInstance(await node.resolve('NftTokenInfoSentinel'))
      sentinel?.on('reportEnd', (args) => {
        const { inPayloads, outPayloads } = args as ReportEndEventArgs
        console.log(`tokensSentinelInPayloads: ${inPayloads?.length}`)
        console.log(`tokensSentinelOutPayloads: ${outPayloads?.length}`)
        console.log(`tokens: ${JSON.stringify(outPayloads, null, 2)}`)
      })
      return sentinel
    }
  }, [node])

  const [contractSentinel] = usePromise(async () => {
    if (node) {
      const sentinel = asSentinelInstance(await node.resolve('NftInfoSentinel'))
      sentinel?.on('reportEnd', async (args) => {
        const { inPayloads, outPayloads } = args as ReportEndEventArgs
        console.log(`inPayloads: ${inPayloads?.length}`)
        console.log(`outPayloads: ${outPayloads?.length}`)
        const calls = Array(1000).map((_, index) => ({
          address: '0x562fC2927c77cB975680088566ADa1dC6cB8b5Ea', // Random ERC721
          params: [index],
          schema: EvmCallWitnessConfigSchema,
        }))
        await tokensSentinel?.report(calls)
      })
      return sentinel
    }
  }, [node, tokensSentinel])

  const inPayloads = [
    {
      address: '0x562fC2927c77cB975680088566ADa1dC6cB8b5Ea', // Random ERC721
      schema: EvmCallWitnessConfigSchema,
    },
  ]

  return (
    <FlexCol gap={2}>
      <SentinelCard mod={contractSentinel} inPayloads={inPayloads} />
      {/* tokens ? <JsonViewerEx value={tokens} /> : null */}
    </FlexCol>
  )
}

const NftTokensSentinelCard = NftTokensSentinelTemplate.bind({})

export { NftSentinelCard, NftTokensSentinelCard }

export default StorybookEntry
