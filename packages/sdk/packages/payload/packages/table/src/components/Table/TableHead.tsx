import {
  TableCell, TableHead, TableRow, Typography,
} from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import React, { useMemo } from 'react'

import { payloadColumnNames, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig.ts'
import type { PayloadTableHeadProps } from './types/index.ts'

export const PayloadTableHead: React.FC<PayloadTableHeadProps> = ({
  columns, ...props
}) => {
  const breakPoint = useBreakpoint()
  const columnsMemo = useMemo(() => columns ?? payloadTableColumnConfigDefaults(), [columns])
  return (
    <TableHead {...props}>
      <TableRow>
        {breakPoint
          ? columnsMemo[breakPoint]?.map((column, index) => {
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
