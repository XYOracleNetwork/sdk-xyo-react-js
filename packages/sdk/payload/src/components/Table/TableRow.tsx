import { TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloadValidator, XyoPayloadWrapper } from '@xyo-network/payload'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell } from '@xyo-network/react-shared'
import { MdClear, MdDone } from 'react-icons/md'

import { PayloadTableColumnConfig, payloadTableColumnConfigDefaults, PayloadTableColumnSlug } from './PayloadTableColumnConfig'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  exploreDomain?: string
  columns?: PayloadTableColumnConfig
  network?: string
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain,
  network: networkProp,
  payload,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  const { network } = useNetwork()

  const hash: React.FC<TableCellProps> = (props) => (
    <HashTableCell
      key="hash"
      width="100%"
      value={wrapper?.hash}
      dataType="payload"
      exploreDomain={exploreDomain}
      network={networkProp ?? network?.slug}
      {...props}
    />
  )

  const schema: React.FC<TableCellProps> = (props) => (
    <TableCell key="payloads" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.schema}
      </Typography>
    </TableCell>
  )

  const isValid = wrapper ? new XyoPayloadValidator(wrapper.body).validate().length === 0 : undefined

  const valid: React.FC<TableCellProps> = (props) => (
    <TableCell key="valid" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {isValid === undefined ? (
          <MdDone fontSize={18} color="yellow" />
        ) : isValid ? (
          <MdDone fontSize={18} color="green" />
        ) : (
          <MdClear color="red" fontSize={18} />
        )}
      </Typography>
    </TableCell>
  )

  const tableCells: Record<PayloadTableColumnSlug, React.FC<TableCellProps>> = {
    hash,
    schema,
    valid,
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return tableCells[column]({})
      })}
    </TableRow>
  ) : null
}
