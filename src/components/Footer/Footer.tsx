import { Container } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/sdk-react'

import { Copyright } from './Copyright'
import { Developers } from './Developers'
import { SocialLinks } from './SocialLinks'
import { Support } from './Support'
import { XyoTokens } from './XyoTokens'

const Footer: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <FlexCol alignItems="stretch" padding={4}>
        <FlexRow flexWrap="wrap" justifyContent="space-around" alignItems="flex-start">
          <SocialLinks />
          <Support />
          <Developers />
          <XyoTokens />
        </FlexRow>
        <Copyright />
      </FlexCol>
    </Container>
  )
}

export { Footer }
