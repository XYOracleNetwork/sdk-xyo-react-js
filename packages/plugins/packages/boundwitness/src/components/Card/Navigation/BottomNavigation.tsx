import { BottomNavigation, BottomNavigationAction, Paper, PaperProps, styled } from '@mui/material'
import { useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export const BoundWitnessCardBottomNavigation: React.FC<PaperProps> = (props) => {
  const [value, setValue] = useState(0)
  return (
    <PaperNavWrapper elevation={3} {...props}>
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
    </PaperNavWrapper>
  )
}

const PaperNavWrapper = styled(Paper, { name: 'PaperNavWrapper' })(({ theme }) => ({
  borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
}))
