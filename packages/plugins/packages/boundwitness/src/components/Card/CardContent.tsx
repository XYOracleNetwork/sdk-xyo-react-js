import { Avatar, AvatarGroup, CardContent, CardContentProps, styled, Typography, TypographyProps, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

export interface BoundWitnessCardContentProps extends CardContentProps {
  boundwitness?: XyoPayload<XyoBoundWitness>
}

export const BoundWitnessCardContent: React.FC<BoundWitnessCardContentProps> = ({ boundwitness, ...props }) => {
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
        <AvatarGroup max={5} total={boundwitness?.payload_hashes.length}>
          {boundwitness?.payload_schemas.map((schema, index) => (
            <Avatar key={index + schema} title={schema}>
              {schema[0]}
            </Avatar>
          ))}
        </AvatarGroup>
      </CardColumnsFlex>
      <CardColumnsFlex>
        <CardColumnTitleH2 title="Additional Signers">{additionalAddressCount(boundwitness?.addresses.length)}</CardColumnTitleH2>
        <AvatarGroup max={5} total={boundwitness ? boundwitness?.addresses.length : undefined}>
          {boundwitness?.addresses.map((address, index) => (
            <Avatar key={index + address} title={address}>
              <Identicon
                value={address}
                position="absolute"
                p={0.25}
                top={0}
                bottom={0}
                left={0}
                right={0}
                size={parseInt(theme.spacing(2.5).slice(0, -2)) * 0.75}
              />
            </Avatar>
          ))}
        </AvatarGroup>
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
