import { CardContent, CardContentProps, styled, Typography, TypographyProps } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

import { AddressAvatarGroup } from './AddressAvatarGroup'
import { SchemaAvatarGroup } from './SchemaAvatarGroup'

export interface BoundWitnessCardContentProps extends CardContentProps {
  payload?: XyoPayload
}

export const BoundWitnessCardContent: React.FC<BoundWitnessCardContentProps> = ({ payload, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>

  return (
    <CardContentFlex {...props}>
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

const CardColumnTitleH2: React.FC<TypographyProps> = (props) => <CardColumnTitle variant="h4" {...props} />

const CardContentFlex = styled(CardContent, { name: 'CardContentFlex' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  rowGap: theme.spacing(1),
}))

const CardColumnsFlex = styled(FlexCol, { name: 'CardColumnsFlex' })(({ theme }) => ({
  ['@media only screen and (min-width: 333px)']: {
    minWidth: '50%',
  },
  minWidth: '100%',
  rowGap: theme.spacing(1),
}))

const CardColumnTitle = styled(Typography, { name: 'CardColumnTitle' })(() => ({
  fontWeight: 500,
}))
