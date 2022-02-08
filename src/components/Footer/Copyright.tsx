import { Link, Typography } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/sdk-react'

const Bar: React.FC = () => {
  return (
    <Typography marginX={1} component="span">
      |
    </Typography>
  )
}

const Ampersand: React.FC = () => {
  return (
    <Typography marginX={1} component="span">
      &amp;
    </Typography>
  )
}

const Copyright: React.FC<FlexBoxProps> = (props) => (
  <FlexRow {...props}>
    <Typography margin={1} variant="subtitle1" textAlign="center">
      Copyright &copy;&nbsp;2022&nbsp;
      <Link href="https://xy.company/" target="_blank">
        XY Labs, Inc.
      </Link>
      <Ampersand />
      <Link href="https://xyo.network/" target="_blank">
        XYO Foundation
      </Link>
      <Bar />
      <Link href="https://xy.company/privacy/" target="_blank">
        Privacy Policy
      </Link>
      <Bar />
      <Link href="https://xy.company/terms/" target="_blank">
        Terms of Service
      </Link>
    </Typography>
  </FlexRow>
)

export { Copyright }
