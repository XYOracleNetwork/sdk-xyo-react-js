import { Link, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'

const Support: React.FC<FlexBoxProps> = (props) => (
  <FlexCol {...props}>
    <Typography margin={1} variant="h6">
      Support
    </Typography>
    <Link
      margin={1}
      href="https://support.xy.company/hc/en-us/categories/360001417734-XYO-Network"
      target="_blank"
      variant="body1"
    >
      Help Center
    </Link>
    <Link margin={1} href="https://support.xy.company/hc/en-us/requests/new" target="_blank" variant="body1">
      Support
    </Link>
  </FlexCol>
)

export { Support }
