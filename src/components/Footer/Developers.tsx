import { Link, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'

const Developers: React.FC<FlexBoxProps> = (props) => (
  <FlexCol {...props}>
    <Typography margin={1} variant="h6">
      Developers
    </Typography>
    <Link margin={1} href="https://github.com/xyoraclenetwork" target="_blank" variant="body1">
      XYO Open Source (v1 &amp; v2)
    </Link>
    <Link margin={1} href="https://developers.xyo.network/" target="_blank" variant="body1">
      Documentation (v1)
    </Link>
  </FlexCol>
)

export { Developers }
