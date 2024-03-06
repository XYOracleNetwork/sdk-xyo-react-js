import { CardContentProps } from '@mui/material'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { Payload } from '@xyo-network/payload-model'
import { forwardRef } from 'react'

import { AddressAvatarGroup } from './AddressAvatarGroup'
import { CardColumnsFlex, CardColumnTitleH2, CardContentFlex } from './layout'
import { SchemaAvatarGroup } from './SchemaAvatarGroup'

export interface BoundWitnessCardContentProps extends CardContentProps {
  active?: boolean
  payload?: Payload
}

export const BoundWitnessCardContent = forwardRef<HTMLElement, BoundWitnessCardContentProps>(({ payload, active, ...props }) => {
  const boundwitness = payload as Payload<BoundWitness>

  return (
    <CardContentFlex active={active} {...props}>
      <CardColumnsFlex>
        <CardColumnTitleH2>Payloads</CardColumnTitleH2>
        <SchemaAvatarGroup schemas={boundwitness?.payload_schemas} />
      </CardColumnsFlex>
      <CardColumnsFlex>
        <CardColumnTitleH2>Signers</CardColumnTitleH2>
        <AddressAvatarGroup addresses={boundwitness?.addresses} />
      </CardColumnsFlex>
    </CardContentFlex>
  )
})

BoundWitnessCardContent.displayName = 'BoundWitnessCardContent'
