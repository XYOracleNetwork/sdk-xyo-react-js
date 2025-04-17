import type { CardContentProps } from '@mui/material'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { Payload } from '@xyo-network/payload-model'
import React from 'react'

import { AddressAvatarGroup } from './AddressAvatarGroup.tsx'
import {
  CardColumnsFlex, CardColumnTitleH2, CardContentFlex,
} from './layout/index.ts'
import { SchemaAvatarGroup } from './SchemaAvatarGroup.tsx'

export interface BoundWitnessCardContentProps extends CardContentProps {
  active?: boolean
  payload?: Payload
}

export const BoundWitnessCardContent = ({
  ref, payload, active, ...props
}: BoundWitnessCardContentProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
  const boundwitness = payload as Payload<BoundWitness>

  return (
    <CardContentFlex ref={ref} active={active} {...props}>
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
}

BoundWitnessCardContent.displayName = 'BoundWitnessCardContent'
