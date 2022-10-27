import { CardContent, CardContentProps, styled, Typography, TypographyProps, useTheme } from '@mui/material'
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
  const theme = useTheme()
  const additionalAddressCount = (count?: number) => {
    if (!count || count <= 1) {
      return null
    }
    return `+${count - 1}`
  }

  return (
    <CardContentFlex {...props}>
      <CardColumnsFlex borderRight={`1px solid ${theme.palette.divider}`}>
        <CardColumnTitleH2 title="Payload Count">{boundwitness?.payload_hashes.length}</CardColumnTitleH2>
        <SchemaAvatarGroup schemas={boundwitness?.payload_schemas} />
      </CardColumnsFlex>
      <CardColumnsFlex>
        <CardColumnTitleH2 title="Additional Signers">{additionalAddressCount(boundwitness?.addresses.length)}</CardColumnTitleH2>
        <AddressAvatarGroup addresses={boundwitness?.addresses} />
      </CardColumnsFlex>
    </CardContentFlex>
  )
}

const CardColumnTitleH2: React.FC<TypographyProps> = (props) => <CardColumnTitle variant="h2" {...props} />

const CardContentFlex = styled(CardContent, { name: 'CardContentFlex' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('xs')]: {
    flexWrap: 'wrap',
  },
}))

const CardColumnsFlex = styled(FlexCol, { name: 'CardColumnsFlex' })(({ theme }) => ({
  flexBasis: '50%',
  rowGap: theme.spacing(1),
}))

const CardColumnTitle = styled(Typography, { name: 'CardColumnTitle' })(() => ({
  fontWeight: 500,
}))
