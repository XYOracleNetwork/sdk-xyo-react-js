import { TableBody, TableHead, TableRow, Typography } from '@mui/material'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { TableRowNoData } from '@xyo-network/react-payload-table'
import { useHash } from '@xyo-network/react-shared'
import { TableCellEx, TableEx, TableExProps } from '@xyo-network/react-table'

import { BoundWitnessSignatureTableRow } from './SignatureTableRow'

export interface BoundWitnessSignatureTableProps extends TableExProps {
  block?: BoundWitness
}

interface SignatureData {
  address: string
  previous_hash: string | null
  signature?: string
}

const signatureDataFromBoundWitness = (boundWitness: BoundWitness) => {
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
  const hash = useHash(block)

  return (
    <TableEx {...props}>
      <TableHead>
        <TableRow>
          <TableCellEx align="left">
            <Typography variant="caption">
              <strong>Address</strong>
            </Typography>
          </TableCellEx>
          <TableCellEx sx={{ display: { md: 'table-cell', xs: 'none' } }} align="center" width="10px">
            <Typography variant="caption">
              <strong>Previous</strong>
            </Typography>
          </TableCellEx>
          <TableCellEx sx={{ display: { sm: 'table-cell', xs: 'none' } }} align="center" width="10px">
            <Typography variant="caption">
              <strong>Signature</strong>
            </Typography>
          </TableCellEx>
          <TableCellEx align="center" width="10px">
            <Typography variant="caption">
              <strong>Valid</strong>
            </Typography>
          </TableCellEx>
        </TableRow>
      </TableHead>
      <TableBody>
        {!signatureData || signatureData.length === 0 ? <TableRowNoData additionalCells={3} /> : null}
        {signatureData.map((data, index) => {
          return (
            <BoundWitnessSignatureTableRow
              key={`${data.signature}-${data.previous_hash}-${index}`}
              address={data.address}
              previousHash={data.previous_hash}
              hash={hash}
              signature={data.signature}
              clickableFields={['address']}
            />
          )
        })}
      </TableBody>
    </TableEx>
  )
}
