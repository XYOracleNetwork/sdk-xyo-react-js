import { Alert, Button, MenuItem, Select, TextField } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { asDivinerInstance } from '@xyo-network/diviner-model'
import { PayloadDivinerQuerySchema } from '@xyo-network/diviner-payload-model'
import { EvmContract } from '@xyo-network/evm-contract-witness'
import { isEvmTokenInterfaceImplemented } from '@xyo-network/evm-token-interface-diviner'
import { useNode } from '@xyo-network/react-node'
import { asSentinelInstance } from '@xyo-network/sentinel-model'
import { EvmAddress, EvmAddressSchema } from '@xyo-network/witness-evm-abstract'
import { TimeStamp } from '@xyo-network/witness-timestamp'
import { ReactNode, useCallback, useState } from 'react'

import { UseIndexedResultsProps } from './lib'

const address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'

const supportedTokenInterfaces = [
  'ERC721',
  'ERC1155',
  // Waiting on a Sentinel for these types
  // 'ERC721TokenReceiver',
  // 'ERC721Metadata',
  // 'ERC721Enumerable',
  // 'ERC1155TokenReceiver',
  // 'ERC1155Metadata_URI',
  // 'ERC20',
]

export interface TestSentinelProps {
  children?: (props: UseIndexedResultsProps) => ReactNode
}

export const TestSentinel: React.FC<TestSentinelProps> = ({ children }) => {
  const [node] = useNode()
  const [addressField, setAddressField] = useState(address)
  const [tokenInterfaceField, setTokenInterfaceField] = useState(supportedTokenInterfaces[0])
  const [valid, setValid] = useState<boolean>()
  const [indexedResult, setIndexedResult] = useState<boolean>()

  const IndexedDivinerName = 'EvmTokenInterfaceImplementedIndexDiviner'

  const handleReport = async () => {
    await testReport(addressField, tokenInterfaceField)
  }

  const testReport = useCallback(
    async (address: string, tokenInterface?: string) => {
      if (node) {
        try {
          // test indexed call
          const diviner = asDivinerInstance(await node.resolve(IndexedDivinerName))
          const query = { address, chainId: 1, implemented: true, schema: PayloadDivinerQuerySchema, tokenInterface }
          const result = await diviner?.divine([query])
          if (result?.length) {
            setIndexedResult(true)
            setTimeout(() => setValid(undefined), 4000)
          } else {
            setIndexedResult(false)
            setTimeout(() => setValid(undefined), 4000)
            const contractSentinel = asSentinelInstance(await node.resolve('EvmContractSentinel'))
            const collectionCallPayload: EvmAddress = { address, chainId: 1, schema: EvmAddressSchema }
            const report = await contractSentinel?.report([collectionCallPayload])
            const contract = ((report as [BoundWitness, TimeStamp, EvmContract]) ?? [])[2]
            const sentinelName = `${tokenInterface}TokenInterfaceImplementedSentinel`
            const tokenSentinel = asSentinelInstance(await node.resolve(sentinelName))
            const tokenReport = await tokenSentinel?.report([contract])
            const implemented = tokenReport?.filter(isEvmTokenInterfaceImplemented).some((i) => i.implemented)
            setValid(implemented)
            setTimeout(() => setValid(undefined), 4000)
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    [node],
  )

  return (
    <FlexCol gap={2} alignItems="start">
      <TextField defaultValue={address} onChange={(e) => setAddressField(e.target.value)} />
      <Select defaultValue={supportedTokenInterfaces[0]} onChange={(e) => setTokenInterfaceField(e.target.value)}>
        {supportedTokenInterfaces.map((tokenInterface) => (
          <MenuItem key={tokenInterface} value={tokenInterface}>
            {tokenInterface}
          </MenuItem>
        ))}
      </Select>
      <Button variant={'contained'} onClick={handleReport}>
        Report
      </Button>
      {valid === undefined ? null : <Alert severity={valid ? 'success' : 'error'}>{valid ? 'Valid Interface' : 'Not a valid Interface'}</Alert>}
      {indexedResult === undefined ? null : (
        <Alert severity={indexedResult ? 'success' : 'error'}>{indexedResult ? 'Indexed Result Found' : 'Not an indexed result'}</Alert>
      )}
      {children?.({ address: addressField, chainId: 1, diviners: [IndexedDivinerName], tokenInterface: tokenInterfaceField })}
    </FlexCol>
  )
}
