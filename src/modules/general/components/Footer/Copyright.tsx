import { Typography } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/sdk-react'

import { Ampersand } from '../Ampersand'
import { Pipe } from '../Pipe'
import { FooterLink } from './Link'

export const Copyright: React.FC<FlexBoxProps> = (props) => (
  <FlexRow {...props}>
    <Typography margin={1} variant="subtitle1" textAlign="center">
      Copyright &copy;&nbsp;2022&nbsp;
      <FooterLink href="https://xy.company/">XY Labs, Inc.</FooterLink>
      <Ampersand />
      <FooterLink href="https://xyo.network/">XYO Foundation</FooterLink>
      <Pipe />
      <FooterLink href="https://xy.company/privacy/">Privacy Policy</FooterLink>
      <Pipe />
      <FooterLink href="https://xy.company/terms/">Terms of Service</FooterLink>
      <Pipe />
      <FooterLink href="https://xylabs.com/jobs">Careers</FooterLink>
    </Typography>
  </FlexRow>
)
