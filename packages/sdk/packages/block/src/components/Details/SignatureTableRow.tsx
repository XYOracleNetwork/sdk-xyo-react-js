import type { TableRowProps } from '@mui/material'
import {
  TableCell, TableRow, Typography,
} from '@mui/material'
import { toUint8Array } from '@xylabs/arraybuffer'
import { ellipsize } from '@xylabs/eth-address'
import { usePromise } from '@xylabs/react-promise'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { AddressTableCell } from '@xyo-network/react-shared'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { MdClear, MdDone } from 'react-icons/md'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export interface BlockSignatureTableRowProps extends TableRowProps {
  address?: string
  archive?: string
  hash?: string
  previousHash?: string | null
  signature?: string
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockSignatureTableRow: React.FC<BlockSignatureTableRowProps> = ({
  hash, address, previousHash, signature, archive, ...props
}) => {
  const [errors] = usePromise(
    async () =>
      hash && address
        ? await BoundWitnessValidator.validateSignature(
            toUint8Array(hash).buffer,
            toUint8Array(address).buffer,
            toUint8Array(signature)?.buffer,
          )
        : [],
    [hash, address, signature],
  )

  return (
    <TableRow {...props}>
      <AddressTableCell archive={archive} value={address} />
      <TableCell
        sx={{ display: { md: 'table-cell', xs: 'none' } }}
        align="center"
      >
        <Typography variant="body2" fontFamily="monospace">
          {previousHash ? ellipsize(previousHash, 8) : '-'}
        </Typography>
      </TableCell>
      <TableCell
        sx={{ display: { sm: 'table-cell', xs: 'none' } }}
        align="center"
      >
        <Typography variant="body2" fontFamily="monospace">
          {signature ? ellipsize(signature, 8) : '-'}
        </Typography>
      </TableCell>
      <TableCell key="valid" align="center">
        {errors === undefined
          ? <MdDone fontSize={18} color="gray" />
          : errors?.length === 0
            ? <MdDone fontSize={18} color="green" />
            : <MdClear color="red" fontSize={18} />}
      </TableCell>
    </TableRow>
  )
}
