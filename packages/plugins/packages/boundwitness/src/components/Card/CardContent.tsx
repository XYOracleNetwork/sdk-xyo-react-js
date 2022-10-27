import { Avatar, AvatarGroup, CardContent, CardContentProps, styled, Typography, TypographyProps } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

export interface BoundWitnessCardContentProps extends CardContentProps {
  boundwitness?: XyoPayload<XyoBoundWitness>
}

export const BoundWitnessCardContent: React.FC<BoundWitnessCardContentProps> = ({ boundwitness, ...props }) => {
  const additionalAddressCount = (count?: number) => {
    if (!count || count <= 1) {
      return null
    }
    return <CardColumnTitleH2 title="Additional Signers">{`+${count - 1}`}</CardColumnTitleH2>
  }
  return (
    <CardContentFlex {...props}>
      <CardColumnsFlex>
        <CardColumnTitleH2 title="Payload Count">{boundwitness?.payload_hashes.length}</CardColumnTitleH2>
        <AvatarGroup max={3} total={boundwitness?.payload_hashes.length}>
          {boundwitness?.payload_schemas.map((schema, index) => (
            <Avatar key={index + schema}>{schema[0]}</Avatar>
          ))}
        </AvatarGroup>
      </CardColumnsFlex>
      <CardColumnsFlex>
        {additionalAddressCount(boundwitness?.addresses.length)}
        {/* <AvatarGroup max={3} total={boundwitness?.payload_hashes.length}>
          {boundwitness?.payload_schemas.map((schema, index) => (
            <Avatar key={index + schema}>{schema[0]}</Avatar>
          ))}
        </AvatarGroup> */}
      </CardColumnsFlex>
    </CardContentFlex>
  )
}

const CardColumnTitleH2: React.FC<TypographyProps> = (props) => <CardColumnTitle variant="h2" {...props} />

const CardContentFlex = styled(CardContent, { name: 'CardContentFlex' })(() => ({
  columnGap: 2,
  display: 'flex',
  flexDirection: 'row',
}))

const CardColumnsFlex = styled(FlexCol, { name: 'CardColumnsFlex' })(() => ({
  flexBasis: '50%',
  rowGap: 1,
}))

const CardColumnTitle = styled(Typography, { name: 'CardColumnTitle' })(() => ({
  fontWeight: 500,
}))
