import { BottomNavigation, BottomNavigationAction, BottomNavigationProps, styled } from '@mui/material'
import { BoundWitness, BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import React, { Dispatch, forwardRef, SetStateAction } from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { FaSignature } from 'react-icons/fa'
// eslint-disable-next-line import-x/no-internal-modules
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface BoundWitnessBottomNavigationProps extends BottomNavigationProps {
  activeTab?: number
  boundWitness?: BoundWitness
  setActiveTab?: Dispatch<SetStateAction<number>>
}

const BoundWitnessBottomNavigation = forwardRef<HTMLDivElement, BoundWitnessBottomNavigationProps>(
  ({ activeTab = 0, setActiveTab, boundWitness, ...props }, ref) => {
    const payloadCount = boundWitness?.payload_schemas.filter(schema => schema !== BoundWitnessSchema).length ?? 0
    const boundWitnessCount = boundWitness?.payload_schemas.filter(schema => schema === BoundWitnessSchema).length ?? 0
    const signers = boundWitness?.addresses.length ?? 0

    return (
      <StyledBottomNavigation
        showLabels
        value={activeTab}

        onChange={(_event, newValue) => {
          setActiveTab?.(newValue)
        }}
        ref={ref}
        {...props}
      >
        <BottomNavigationAction label={`Payloads - ${payloadCount}`} icon={<VscSymbolNamespace />} />
        <BottomNavigationAction label={`Bound Witnesses - ${boundWitnessCount}`} icon={<VscSymbolMethod />} />
        <BottomNavigationAction label={`Signatures - ${signers}`} icon={<FaSignature />} />
      </StyledBottomNavigation>
    )
  },
)

BoundWitnessBottomNavigation.displayName = 'BoundWitnessBottomNavigation'
export { BoundWitnessBottomNavigation }

const StyledBottomNavigation = styled(BottomNavigation, { name: 'StyledBottomNavigation' })(() => ({
  background: 'inherit',
}))
