import { TableCell, TableHead, TableRow, Typography } from '@mui/material'

import { payloadColumnNames, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig'
import { PayloadTableHeadProps } from './types'

export const PayloadTableHead: React.FC<PayloadTableHeadProps> = ({ columns = payloadTableColumnConfigDefaults(), breakPoint, ...props }) => {
  return (
    <TableHead {...props}>
      <TableRow>
        {breakPoint && columns
          ? columns[breakPoint]?.map((column, index) => {
              return (
                <TableCell key={index} width={index === 0 ? '100%' : undefined} align={index === 0 ? 'left' : 'center'}>
                  <Typography variant="body2" noWrap>
                    {payloadColumnNames[column]}
                  </Typography>
                </TableCell>
              )
            })
          : null}
      </TableRow>
    </TableHead>
  )
}
