import { CardContentProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { XyoPayload } from '@xyo-network/payload-model'

import { AddressAvatarGroup } from './AddressAvatarGroup'
import { CardColumnsFlex, CardColumnTitleH2, CardContentFlex } from './layout'
import { SchemaAvatarGroup } from './SchemaAvatarGroup'

export interface BoundWitnessCardContentProps extends CardContentProps {
  active?: boolean
  payload?: XyoPayload
}

export const BoundWitnessCardContent: React.FC<BoundWitnessCardContentProps> = ({ payload, active, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>

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
}
