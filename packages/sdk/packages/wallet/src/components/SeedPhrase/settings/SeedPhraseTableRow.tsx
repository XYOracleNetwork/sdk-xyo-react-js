import { Cancel as CancelIcon, RadioButtonChecked as RadioButtonCheckedIcon } from '@mui/icons-material'
import { Button, ButtonGroup, TableCell, TableRow, TableRowProps } from '@mui/material'
import { useState } from 'react'

import { SeedPhraseIconButton } from '../_shared'
import { SeedPhraseDialog } from '../dialog'

export interface SeedPhraseTableRowProps extends TableRowProps {
  changeSeedPhrase?: (seedPhrase: string) => void
  seedPhrase?: string
}

export const SeedPhraseTableRow: React.FC<SeedPhraseTableRowProps> = ({ changeSeedPhrase, seedPhrase, ...props }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <TableRow {...props}>
      <TableCell>
        Seed Phrase <SeedPhraseIconButton />
      </TableCell>
      <TableCell align="center">
        {seedPhrase ?
          <RadioButtonCheckedIcon color="success" />
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
