import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/sdk-react'

import { Copyright } from './Copyright'
import { Developers } from './Developers'
import { SocialLinks } from './SocialLinks'
import { Support } from './Support'
import { XyoTokens } from './XyoTokens'

const Footer: React.FC<FlexBoxProps> = (props) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow flexWrap="wrap" justifyContent="space-around" alignItems="flex-start">
        <SocialLinks />
        <Support />
        <Developers />
        <XyoTokens />
      </FlexRow>
      <Copyright />
    </FlexCol>
  )
}

export { Footer }
