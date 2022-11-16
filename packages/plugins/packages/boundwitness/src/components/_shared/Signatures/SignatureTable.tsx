import { TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { Hasher } from '@xyo-network/core'
import { TableRowNoData } from '@xyo-network/react-payload-table'
import { ScrollTableOnSm } from '@xyo-network/react-shared'
import { TableEx, TableExProps } from '@xyo-network/react-table'

import { BoundWitnessSignatureTableRow } from './SignatureTableRow'

export interface BoundWitnessSignatureTableProps extends TableExProps {
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

export const BoundWitnessSignatureTable: React.FC<BoundWitnessSignatureTableProps> = ({ block, ...props }) => {
  const signatureData = block ? signatureDataFromBoundWitness(block) : []
  const hash = block ? new Hasher(block).hash : undefined

  return (
    <ScrollTableOnSm>
      <TableEx {...props}>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="caption">
                <strong>Address</strong>
              </Typography>
            </TableCell>
            <TableCell sx={{ display: { md: 'table-cell', xs: 'none' } }} align="center" width="10px">
              <Typography variant="caption">
                <strong>Previous</strong>
              </Typography>
            </TableCell>
            <TableCell sx={{ display: { sm: 'table-cell', xs: 'none' } }} align="center" width="10px">
              <Typography variant="caption">
                <strong>Signature</strong>
              </Typography>
            </TableCell>
            <TableCell align="center" width="10px">
              <Typography variant="caption">
                <strong>Valid</strong>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!signatureData || signatureData.length === 0 ? <TableRowNoData /> : null}
          {signatureData.map((data, index) => {
            return (
              <BoundWitnessSignatureTableRow
                key={`${data.signature}-${data.previous_hash}-${index}`}
                address={data.address}
                previousHash={data.previous_hash}
                hash={hash}
                signature={data.signature}
              />
            )
          })}
        </TableBody>
      </TableEx>
    </ScrollTableOnSm>
  )
}
