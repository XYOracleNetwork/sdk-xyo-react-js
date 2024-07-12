import { ButtonGroup, TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { useState } from 'react'

import { OutOfBoundsSnackBar } from './OutOfBoundsSnackBar.js'

export interface MaxAccountsTableRow extends TableRowProps {
  activeAccountIndex?: number
  changeMaxAccounts?: (maxAccounts: number) => void
  maxAccounts?: number
}

export const MaxAccountsTableRow: React.FC<MaxAccountsTableRow> = ({ activeAccountIndex, changeMaxAccounts, maxAccounts }) => {
  const [desiredMaximumAccounts, setDesiredMaximumAccounts] = useState<number | undefined>()
  const [showSnackBar, setShowSnackBar] = useState(false)

  const handleChangeMaxAccounts = (change: 'increase' | 'decrease') => {
    if (maxAccounts !== undefined && activeAccountIndex !== undefined) {
      switch (change) {
        case 'decrease': {
          const desiredMaximumAccounts = maxAccounts - 1
          const validMaximumAccounts = desiredMaximumAccounts > 0
          const maxAccountsWithinRange = activeAccountIndex + 1 <= desiredMaximumAccounts
          if (validMaximumAccounts && maxAccountsWithinRange) {
            changeMaxAccounts?.(desiredMaximumAccounts)
          }
          if (!maxAccountsWithinRange) setShowSnackBar(true)
          setDesiredMaximumAccounts(desiredMaximumAccounts)
          return
        }
        case 'increase': {
          changeMaxAccounts?.(maxAccounts + 1)
          return
        }
        default: {
          console.error(change, 'is not a recognized value')
        }
      }
    } else {
      throw new Error('Max Accounts is unset and needs a default')
    }
  }

  return (
    <TableRow>
      <TableCell>Maximum Accounts</TableCell>
      <TableCell align="center">
        <Typography variant={'caption'}>{maxAccounts}</Typography>
      </TableCell>
      <TableCell align="center">
        <ButtonGroup>
          <ButtonEx onClick={() => handleChangeMaxAccounts('decrease')} variant={'contained'} size={'small'}>
            -
          </ButtonEx>
          <ButtonEx onClick={() => handleChangeMaxAccounts('increase')} variant={'contained'} size={'small'}>
            +
          </ButtonEx>
        </ButtonGroup>
        <OutOfBoundsSnackBar
          desiredMaximumAccounts={desiredMaximumAccounts}
          activeAccountIndex={activeAccountIndex}
          setShowSnackBar={setShowSnackBar}
          showSnackBar={showSnackBar}
        />
      </TableCell>
    </TableRow>
  )
}
