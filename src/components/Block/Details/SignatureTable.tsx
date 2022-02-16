import { Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { ScrollTableOnSm } from '../../ScrollTableOnSm'
import { BlockSignatureTableRow } from './SignatureTableRow'

export interface BlockSignatureTableProps extends TableProps {
  block?: XyoBoundWitness
}

interface SignatureData {
  address: string
  previous_hash: string | null
  signature?: string
}

const signatureDataFromBoundWitness = (boundWitness: XyoBoundWitness) => {
  const result: SignatureData[] = []
  for (let i = 0; i < boundWitness.addresses.length; i++) {
    result.push({
      address: boundWitness.addresses[i],
      previous_hash: boundWitness.previous_hashes[i],
      signature: boundWitness._signatures?.[i],
    })
  }
  return result
}

export const BlockSignatureTable: React.FC<BlockSignatureTableProps> = ({ block, ...props }) => {
  const signatureData = block ? signatureDataFromBoundWitness(block) : []
  return (
    <ScrollTableOnSm>
      <Table {...props}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="caption">Hash</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">Previous Hash</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">Signature</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {signatureData?.map((data, index) => (
            <BlockSignatureTableRow
              key={index}
              address={data.address}
              previousHash={data.previous_hash}
              signature={data.signature}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollTableOnSm>
  )
}
