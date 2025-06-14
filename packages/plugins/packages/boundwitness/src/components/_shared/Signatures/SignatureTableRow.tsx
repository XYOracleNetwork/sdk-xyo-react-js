import type { TableRowProps } from '@mui/material'
import {
  Link, TableCell, TableRow,
  Typography,
} from '@mui/material'
import { toUint8Array } from '@xylabs/arraybuffer'
import { ellipsize } from '@xylabs/eth-address'
import { usePromise } from '@xylabs/react-promise'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { useEvent } from '@xyo-network/react-event'
import { AddressTableCell } from '@xyo-network/react-shared'
import React from 'react'
import { MdClear, MdDone } from 'react-icons/md'

type clickableFields = 'address' | 'signature'

export interface BoundWitnessSignatureTableRowProps extends TableRowProps {
  address?: string
  /** @deprecated - archives no longer used */
  archive?: string
  clickableFields?: clickableFields[]
  dataHash?: string
  previousHash?: string | null
  signature?: string
}

export const BoundWitnessSignatureTableRow: React.FC<BoundWitnessSignatureTableRowProps> = ({
  address,
  archive,
  clickableFields,
  dataHash,
  previousHash,
  signature,
  ...props
}) => {
  const [errors] = usePromise(
    async () =>
      dataHash && address
        ? await BoundWitnessValidator.validateSignature(
            toUint8Array(dataHash).buffer,
            toUint8Array(address).buffer,
            toUint8Array(signature)?.buffer,
          )
        : [],
    [dataHash, address, signature],
  )

  const [addressRef, addressDispatch] = useEvent<HTMLTableCellElement>()
  const [signatureRef, signatureDispatch] = useEvent<HTMLTableCellElement>()

  const formattedHash = (hash?: string | null) => (hash ? ellipsize(hash, 8) : '-')

  return (
    <TableRow {...props}>
      <AddressTableCell
        ref={addressRef}
        archive={archive}
        value={address}
        onClick={() => addressDispatch('address', 'click', address)}
        link={clickableFields?.includes('address')}
      />
      <TableCell
        sx={{ display: { md: 'table-cell', xs: 'none' } }}
        align="center"
      >
        <Typography variant="body2" fontFamily="monospace">
          {formattedHash(previousHash)}
        </Typography>
      </TableCell>
      <TableCell
        sx={{ display: { sm: 'table-cell', xs: 'none' } }}
        align="center"
      >
        <Typography variant="body2" fontFamily="monospace" ref={signatureRef} onClick={() => signatureDispatch('signature', 'click', signature)}>
          {clickableFields?.includes('signature')
            ? <Link>{formattedHash(signature)}</Link>
            : formattedHash(signature)}
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
