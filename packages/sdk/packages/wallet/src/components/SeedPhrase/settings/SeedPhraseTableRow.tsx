import { Cancel as CancelIcon, RadioButtonChecked as RadioButtonCheckedIcon } from '@mui/icons-material'
import type { TableRowProps } from '@mui/material'
import {
  Button, ButtonGroup, TableCell, TableRow,
} from '@mui/material'
import React, { useState } from 'react'

import { SeedPhraseIconButton } from '../_shared/index.ts'
import { SeedPhraseDialog } from '../dialog/index.ts'

export interface SeedPhraseTableRowProps extends TableRowProps {
  changeSeedPhrase?: (seedPhrase: string) => void
  seedPhrase?: string
}

export const SeedPhraseTableRow: React.FC<SeedPhraseTableRowProps> = ({
  changeSeedPhrase, seedPhrase, ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <TableRow {...props}>
      <TableCell>
        Seed Phrase
        {' '}
        <SeedPhraseIconButton />
      </TableCell>
      <TableCell align="center">
        {seedPhrase
          ? <RadioButtonCheckedIcon color="success" />
          : <CancelIcon color="error" />}
      </TableCell>
      <TableCell>
        <SeedPhraseDialog changeSeedPhrase={changeSeedPhrase} open={open} onClose={() => setOpen(false)} seedPhrase={seedPhrase} />
        <ButtonGroup fullWidth>
          <Button variant="contained" size="small" onClick={handleOpen}>
            Update
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}
