import { BottomNavigation, BottomNavigationAction, Paper, PaperProps, styled } from '@mui/material'
import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface BoundWitnessCardBottomNavigationProps extends PaperProps {
  boundWitness?: XyoBoundWitness
}

export const BoundWitnessCardBottomNavigation: React.FC<BoundWitnessCardBottomNavigationProps> = ({ boundWitness, ...props }) => {
  const [value, setValue] = useState(0)

  const payloadCount = boundWitness?.payload_schemas.filter((schema) => schema !== XyoBoundWitnessSchema).length ?? 0
  const boundWitnessCount = boundWitness?.payload_schemas.filter((schema) => schema === XyoBoundWitnessSchema).length ?? 0
  const signers = boundWitness?.addresses.length ?? 0

  return (
    <PaperNavWrapper elevation={3} {...props}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label={`Payloads - ${payloadCount}`} icon={<VscSymbolNamespace />} />
        <BottomNavigationAction label={`Bound Witnesses - ${boundWitnessCount}`} icon={<VscSymbolMethod />} />
        <BottomNavigationAction label={`Signatures - ${signers}`} icon={<FaSignature />} />
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
