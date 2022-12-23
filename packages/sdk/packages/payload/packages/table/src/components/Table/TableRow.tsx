import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { alpha, TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload-model'
import { PayloadValidator } from '@xyo-network/payload-validator'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell } from '@xyo-network/react-shared'

import { PayloadTableColumnConfig, payloadTableColumnConfigDefaults, PayloadTableColumnSlug } from './PayloadTableColumnConfig'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  archive?: string
  exploreDomain?: string
  columns?: PayloadTableColumnConfig
  network?: string
  maxSchemaDepth?: number
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain,
  network: networkProp,
  payload,
  archive,
  maxSchemaDepth,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const wrapper = payload ? new PayloadWrapper(payload) : undefined
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

  const reduceSchemaDepth = (schema?: string, maxSchemaDepth?: number) => {
    if (maxSchemaDepth) {
      const parts = schema?.split('.') ?? []
      const partsToRemove = parts.length - maxSchemaDepth > 0 ? parts.length - maxSchemaDepth : 0
      if (partsToRemove > 0) {
        return (
          <>
            <>&#x2026;</>
            {`${parts.slice(partsToRemove).reduce((previousValue, part) => `${previousValue}.${part}`)}`}
          </>
        )
      }
    }
    return schema
  }

  const schema: React.FC<TableCellProps> = (props) => (
    <TableCell title={payload?.schema} key="payloads" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {reduceSchemaDepth(payload?.schema, maxSchemaDepth)}
      </Typography>
    </TableCell>
  )

  const isValid = wrapper ? new PayloadValidator(wrapper.body).validate().length === 0 : undefined

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
