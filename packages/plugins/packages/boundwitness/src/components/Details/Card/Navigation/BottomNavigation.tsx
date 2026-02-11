import type { BottomNavigationProps } from '@mui/material'
import {
  BottomNavigation, BottomNavigationAction,
  styled,
} from '@mui/material'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import type {
  Dispatch, SetStateAction, SyntheticEvent,
} from 'react'
import React from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface BoundWitnessBottomNavigationProps extends BottomNavigationProps {
  activeTab?: number
  boundWitness?: BoundWitness
  setActiveTab?: Dispatch<SetStateAction<number>>
}

const BoundWitnessBottomNavigation = ({
  ref, activeTab = 0, setActiveTab, boundWitness, ...props
}: BoundWitnessBottomNavigationProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
  const payloadCount = boundWitness?.payload_schemas.filter(schema => schema !== BoundWitnessSchema).length ?? 0
  const boundWitnessCount = boundWitness?.payload_schemas.filter(schema => schema === BoundWitnessSchema).length ?? 0
  const signers = boundWitness?.addresses.length ?? 0

  return (
    <StyledBottomNavigation
      showLabels
      value={activeTab}

      onChange={(_event: SyntheticEvent, newValue: number) => {
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
}

BoundWitnessBottomNavigation.displayName = 'BoundWitnessBottomNavigation'
export { BoundWitnessBottomNavigation }

const StyledBottomNavigation = styled(BottomNavigation, { name: 'StyledBottomNavigation' })(() => ({ background: 'inherit' }))
