import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { alpha, TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloadValidator, XyoPayloadWrapper } from '@xyo-network/payload'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell } from '@xyo-network/react-shared'

import { PayloadTableColumnConfig, payloadTableColumnConfigDefaults, PayloadTableColumnSlug } from './PayloadTableColumnConfig'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  archive?: string
  exploreDomain?: string
  columns?: PayloadTableColumnConfig
  network?: string
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain,
  network: networkProp,
  payload,
  archive,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  const { network } = useNetwork()

  const hash: React.FC<TableCellProps> = (props) => (
    <HashTableCell
      key="hash"
      archive={archive}
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
      {isValid === undefined && payload != undefined ? (
        <WarningAmberRoundedIcon fontSize="small" color="warning" />
      ) : isValid === true ? (
        <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />
      ) : isValid === false ? (
        <ErrorOutlineRoundedIcon color="error" fontSize="small" />
      ) : (
        //to keep row height consistent when no data provided, may need fix later
        <ErrorOutlineRoundedIcon sx={{ color: alpha('#fff', 0) }} fontSize="small" />
      )}
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
