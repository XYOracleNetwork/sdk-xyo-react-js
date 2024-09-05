import type { TableProps } from '@mui/material'
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadHasher } from '@xyo-network/hash'
import { ScrollTableOnSm } from '@xyo-network/react-shared'
import React from 'react'

import { BlockSignatureTableRow } from './SignatureTableRow.tsx'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export interface BlockSignatureTableProps extends TableProps {
  block?: BoundWitness
}

interface SignatureData {
  address: string
  previous_hash: string | null
  signature?: string
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
const signatureDataFromBoundWitness = (boundWitness: BoundWitness) => {
  const result: SignatureData[] = []
  for (let i = 0; i < boundWitness.addresses.length; i++) {
    result.push({
      address: boundWitness.addresses[i],
      previous_hash: boundWitness.previous_hashes[i],
      signature: boundWitness.$meta.signatures?.[i],
    })
  }
  return result
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockSignatureTable: React.FC<BlockSignatureTableProps> = ({ block, ...props }) => {
  const signatureData = block ? signatureDataFromBoundWitness(block) : []
  const [hash] = usePromise(async () => block ? await PayloadHasher.hash(block) : undefined, [block])

  return (
    <ScrollTableOnSm>
      <Table {...props}>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="caption">
                <strong>Address</strong>
              </Typography>
            </TableCell>
            <TableCell
              sx={{ display: { md: 'table-cell', xs: 'none' } }}
              align="center"
              width="10px"
            >
              <Typography variant="caption">
                <strong>Previous</strong>
              </Typography>
            </TableCell>
            <TableCell
              sx={{ display: { sm: 'table-cell', xs: 'none' } }}
              align="center"
              width="10px"
            >
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
          {signatureData?.map((data, index) => {
            return (
              <BlockSignatureTableRow
                key={`${data.signature}-${data.previous_hash}-${index}`}
                address={data.address}
                previousHash={data.previous_hash}
                hash={hash}
                signature={data.signature}
              />
            )
          })}
        </TableBody>
      </Table>
    </ScrollTableOnSm>
  )
}
