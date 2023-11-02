import { InfuraProvider } from '@ethersproject/providers'
import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { HDWallet } from '@xyo-network/account'
import { CryptoContractFunctionCallSchema } from '@xyo-network/crypto-contract-function-read-payload-plugin'
import { CryptoContractDiviner, CryptoContractFunctionReadWitness } from '@xyo-network/crypto-contract-function-read-plugin'
import { ManifestPayload, ManifestWrapper } from '@xyo-network/manifest'
import { ModuleFactory, ModuleFactoryLocator } from '@xyo-network/module-model'
import { ERC721__factory, ERC721Enumerable__factory, ERC1155__factory } from '@xyo-network/open-zeppelin-typechain'
import { Payload } from '@xyo-network/payload-model'
import { asSentinelInstance, ReportEndEventArgs } from '@xyo-network/sentinel'
import { useState } from 'react'
import JsonView from 'react-json-view'

import { SentinelCard } from './Card'
import NftSentinelManifest from './NftSentinel.json'

const loadFromManifest = async () => {
  const mnemonic = 'later puppy sound rebuild rebuild noise ozone amazing hope broccoli crystal grief'
  const wallet = await HDWallet.fromMnemonic(mnemonic)
  const provider = new InfuraProvider('homestead', {
    projectId: process.env.STORYBOOK_INFURA_PROJECT_ID,
    projectSecret: process.env.STORYBOOK_INFURA_PROJECT_SECRET,
  })

  const locator = new ModuleFactoryLocator()
  locator.register(CryptoContractDiviner)

  locator.register(
    new ModuleFactory(CryptoContractFunctionReadWitness, {
      factory: (address: string) => ERC721__factory.connect(address, provider),
    }),
    { 'network.xyo.crypto.contract.interface': 'Erc721' },
  )

  locator.register(
    new ModuleFactory(CryptoContractFunctionReadWitness, {
      factory: (address: string) => ERC721Enumerable__factory.connect(address, provider),
    }),
    { 'network.xyo.crypto.contract.interface': 'Erc721Enumerable' },
  )

  locator.register(
    new ModuleFactory(CryptoContractFunctionReadWitness, {
      factory: (address: string) => ERC1155__factory.connect(address, provider),
    }),
    { 'network.xyo.crypto.contract.interface': 'Erc1155' },
  )

  const manifest = new ManifestWrapper(NftSentinelManifest as ManifestPayload, wallet, locator)
  const node = await manifest.loadNodeFromIndex(0)
  console.log(`node: ${(await node.resolve()).length}`)
  return node
}

const StorybookEntry = {
  component: SentinelCard,
  parameters: {
    docs: {
      page: null,
    },
  },
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
      address: '0x562fC2927c77cB975680088566ADa1dC6cB8b5Ea', //Random ERC721
      schema: CryptoContractFunctionCallSchema,
    },
  ]

  return (
    <FlexCol gap={2}>
      <SentinelCard module={sentinel} inPayloads={inPayloads} />
    </FlexCol>
  )
}

const NftSentinelCard = NftSentinelTemplate.bind({})

const NftTokensSentinelTemplate: StoryFn<typeof SentinelCard> = () => {
  const [node] = usePromise(async () => await loadFromManifest(), [])
  const [tokens, setTokens] = useState<Payload[]>()

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
          address: '0x562fC2927c77cB975680088566ADa1dC6cB8b5Ea', //Random ERC721
          params: [index],
          schema: CryptoContractFunctionCallSchema,
        }))
        await tokensSentinel?.report(calls)
      })
      return sentinel
    }
  }, [node, tokensSentinel])

  const inPayloads = [
    {
      address: '0x562fC2927c77cB975680088566ADa1dC6cB8b5Ea', //Random ERC721
      schema: CryptoContractFunctionCallSchema,
    },
  ]

  return (
    <FlexCol gap={2}>
      <SentinelCard module={contractSentinel} inPayloads={inPayloads} />
      {/*tokens ? <JsonView src={tokens} /> : null*/}
    </FlexCol>
  )
}

const NftTokensSentinelCard = NftTokensSentinelTemplate.bind({})

export { NftSentinelCard, NftTokensSentinelCard }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
