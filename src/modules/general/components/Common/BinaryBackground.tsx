import { FlexGrowRow } from '@xylabs/sdk-react'

import { binaryBackground } from './img'

export const BinaryBackground: React.FC = () => {
  return (
    <FlexGrowRow
      style={{ backgroundImage: `url(${binaryBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      height="100%"
      position="absolute"
      width="100%"
    ></FlexGrowRow>
  )
}
