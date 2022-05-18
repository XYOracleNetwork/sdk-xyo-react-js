import { Chip, Typography, useTheme } from '@mui/material'
import { FlexCol, FlexRow, LinkEx, useMediaQuery } from '@xylabs/sdk-react'
import { useNavigate } from 'react-router-dom'

export const HiringBarAlert: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <FlexRow bgcolor={theme.palette.primary.dark} paddingY={1} width="100%">
      <FlexCol marginRight={1}>{isMobile ? null : <Chip color="primary" label="We're hiring!" onClick={() => navigate('/jobs')} clickable></Chip>}</FlexCol>
      <FlexCol>
        <Typography color={theme.palette.primary.contrastText} variant="body1">
          Join the XY Team today.&nbsp;
          <LinkEx to="https://xylabs.com/jobs" underline="always" color={theme.palette.primary.contrastText}>
            {'Explore careers'}
          </LinkEx>
        </Typography>
      </FlexCol>
    </FlexRow>
  )
}
