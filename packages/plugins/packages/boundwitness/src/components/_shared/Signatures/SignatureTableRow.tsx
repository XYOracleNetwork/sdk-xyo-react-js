import { Link, TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { ellipsize } from '@xylabs/sdk-js'
import { BoundWitnessValidator } from '@xyo-network/boundwitness'
import { useXyoEvent } from '@xyo-network/react-event'
import { AddressTableCell } from '@xyo-network/react-shared'
import { MdClear, MdDone } from 'react-icons/md'

type clickableFields = 'address' | 'signature'

export interface BoundWitnessSignatureTableRowProps extends TableRowProps {
  address?: string
  archive?: string
  hash?: string
  previousHash?: string | null
  signature?: string
  clickableFields?: clickableFields[]
}

export const BoundWitnessSignatureTableRow: React.FC<BoundWitnessSignatureTableRowProps> = ({
  hash,
  address,
  previousHash,
  signature,
  archive,
  clickableFields = [],
  ...props
}) => {
  const errors = hash && address ? BoundWitnessValidator.validateSignature(hash, address, signature) : []

  const [addressRef, addressDispatch] = useXyoEvent<HTMLTableCellElement>()
  const [signatureRef, signatureDispatch] = useXyoEvent<HTMLTableCellElement>()

  const formattedHash = (hash?: string | null) => (hash ? ellipsize(hash, 8) : '-')

  return (
    <TableRow {...props}>
      <AddressTableCell
        ref={addressRef}
        archive={archive}
        value={address}
        onClick={() => addressDispatch('address', 'click', address)}
        link={clickableFields.includes('address')}
      />
      <TableCell sx={{ display: { md: 'table-cell', xs: 'none' } }} align="center">
        <Typography variant="body2" fontFamily="monospace">
          {formattedHash(previousHash)}
        </Typography>
      </TableCell>
      <TableCell sx={{ display: { sm: 'table-cell', xs: 'none' } }} align="center">
        <Typography variant="body2" fontFamily="monospace" ref={signatureRef} onClick={() => signatureDispatch('signature', 'click', signature)}>
          {clickableFields.includes('signature') ? <Link>{formattedHash(signature)}</Link> : formattedHash(signature)}
        </Typography>
      </TableCell>
      <TableCell key="valid" align="center">
        {errors.length === 0 ? <MdDone fontSize={18} color="green" /> : <MdClear color="red" fontSize={18} />}
      </TableCell>
    </TableRow>
  )
}
