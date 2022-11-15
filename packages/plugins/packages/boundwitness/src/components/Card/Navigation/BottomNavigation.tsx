import { BottomNavigation, BottomNavigationAction, Paper, PaperProps } from '@mui/material'
import { useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export const BoundWitnessCardBottomNavigation: React.FC<PaperProps> = (props) => {
  const [value, setValue] = useState(0)
  return (
    <Paper sx={{ bottom: 0, left: 0, position: 'fixed', right: 0 }} elevation={3} {...props}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Payloads" icon={<VscSymbolNamespace />} />
        <BottomNavigationAction label="Bound Witnesses" icon={<VscSymbolMethod />} />
        <BottomNavigationAction label="Signatures" icon={<FaSignature />} />
      </BottomNavigation>
    </Paper>
  )
}
