import { Facebook, Instagram, LinkedIn, Reddit, Telegram, Twitter, YouTube } from '@mui/icons-material'
import { Link, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/sdk-react'

const SocialLinks: React.FC<FlexBoxProps> = (props) => {
  return (
    <FlexCol display="flex" flexDirection="column" padding={2} {...props}>
      <Typography margin={1} variant="h6">
        XYO Socials
      </Typography>
      <FlexRow flexWrap="wrap">
        <Link href="https://business.facebook.com/OfficialXYO/" target="_blank" variant="body1">
          <Facebook />
        </Link>
        <Link href="https://twitter.com/OfficialXYO" target="_blank" variant="body1">
          <Twitter />
        </Link>
        <Link href="https://www.instagram.com/officialxyo/" target="_blank" variant="body1">
          <Instagram />
        </Link>
        <Link href="https://t.me/xyonetwork" target="_blank" variant="body1">
          <Telegram />
        </Link>
        <Link href="https://www.reddit.com/r/XYONetwork/" target="_blank" variant="body1">
          <Reddit />
        </Link>
        <Link href="https://www.youtube.com/channel/UCyZDqb9pgntVHJVt1pxXtsw" target="_blank" variant="body1">
          <YouTube />
        </Link>
        <Link href="https://www.linkedin.com/company/officialxyo/" target="_blank" variant="body1">
          <LinkedIn />
        </Link>
      </FlexRow>
    </FlexCol>
  )
}

export { SocialLinks }
