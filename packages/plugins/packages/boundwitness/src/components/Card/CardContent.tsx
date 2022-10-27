import { CardContent, CardContentProps } from '@mui/material'
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
    return `+${count - 1}`
  }
  return (
    <CardContent sx={{ columnGap: 2, display: 'flex', flexDirection: 'row' }}>
      <FlexCol>
        {boundwitness?.payload_hashes.length}
        {/* <AvatarGroup></AvatarGroup> */}
      </FlexCol>
      <FlexCol>
        {additionalAddressCount(boundwitness?.addresses.length)}
        {/* <AvatarGroup></AvatarGroup> */}
      </FlexCol>
    </CardContent>
  )
}
