import { Meta, StoryFn } from '@storybook/react'
import { asSentinelInstance } from '@xyo-network/sentinel-model'

import { Alert, Button, MenuItem, Select, TextField } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { EvmContract } from '@xyo-network/evm-contract-witness'
import { isEvmTokenInterfaceImplemented } from '@xyo-network/evm-token-interface-diviner'
import { useNode } from '@xyo-network/react-node'
import { BlockchainAddress, BlockchainAddressSchema } from '@xyo-network/witness-blockchain-abstract'
import { TimeStamp } from '@xyo-network/witness-timestamp'
import { useCallback, useState } from 'react'
import { ArchivistManifestNode, ManifestNodeProvider, SentinelManifestNode } from '.'
import { ContractWitnessManifestNode, TokenDivinerIndexManifestNode, TokenManifestNode } from './nodes'

const address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'

const supportedTokenInterfaces = ['ERC721', 'ERC721TokenReceiver', 'ERC721Metadata', 'ERC721Enumerable', 'ERC1155', 'ERC1155TokenReceiver', 'ERC1155Metadata_URI', 'ERC20']

const TestSentinel: React.FC = () => {
  const [node] = useNode()
  const [addressField, setAddressField] = useState(address)
  const [tokenInterfaceField, setTokenInterfaceField] = useState(supportedTokenInterfaces[0])
  const [valid, setValid] = useState<boolean>()

  const handleReport = async () => {
    await testReport(addressField, tokenInterfaceField)
  }
  
  const testReport = useCallback(async (address?: string, tokenInterface?: string) => {
    if (node) {
      try {
        const contractSentinel = asSentinelInstance(await node.resolve('EvmContractSentinel'))
        const collectionCallPayload: BlockchainAddress = { address, chainId: 1, schema: BlockchainAddressSchema }
        const report = await contractSentinel?.report([collectionCallPayload])
        const [bw, timestamp, contract] = (report as [BoundWitness, TimeStamp, EvmContract]) ?? []
        const divinerName = `${tokenInterface}TokenInterfaceImplementedSentinel`
        const tokenSentinel = asSentinelInstance(await node.resolve(divinerName))
        const tokenReport = await tokenSentinel?.report([contract])
        const implemented = tokenReport?.filter(isEvmTokenInterfaceImplemented).some((i) => i.implemented)
        setValid(implemented)
        setTimeout(() =>  setValid(undefined), 4000)
      } catch (e) {
        console.error(e)
      }
    }
  }, [node])

  return (
  <FlexCol gap={2} alignItems="start">
    <TextField defaultValue={address} onChange={(e) => setAddressField(e.target.value)} />
    <Select defaultValue={supportedTokenInterfaces[0]} onChange={(e) => setTokenInterfaceField(e.target.value)}>
      {supportedTokenInterfaces.map((tokenInterface) => <MenuItem value={tokenInterface}>{tokenInterface}</MenuItem>)}
    </Select>
    <Button variant={'contained'} onClick={handleReport}>Report</Button>
    {valid !== undefined ? <Alert severity={valid ? 'success' : 'error'}>{valid ? 'Valid Interface' : 'Not a valid Interface'}</Alert> : null}
  </FlexCol>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/manifest-node/provider',
  component: ManifestNodeProvider 
} as Meta

const Template: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args} />
}

const TemplateForContractAndToken: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args}>
    <TestSentinel />
  </ManifestNodeProvider>
}

const Default = Template.bind({})

const WithArchivist = Template.bind({})
WithArchivist.args = {
  manifestNodes: [ArchivistManifestNode]
}

const WithSentinel = Template.bind({})
WithSentinel.args = {
  manifestNodes: [SentinelManifestNode]
}

const WithArchivistAndSentinel = Template.bind({})
WithArchivistAndSentinel.args = {
  manifestNodes: [ArchivistManifestNode, SentinelManifestNode]
}

const WithContractAndToken = TemplateForContractAndToken.bind({})
WithContractAndToken.args = {
  manifestNodes: [TokenManifestNode, ContractWitnessManifestNode, TokenDivinerIndexManifestNode]
}

export { Default, WithArchivist, WithArchivistAndSentinel, WithContractAndToken, WithSentinel }

