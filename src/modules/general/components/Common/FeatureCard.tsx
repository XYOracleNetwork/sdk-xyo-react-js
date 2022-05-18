import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { alpha, BoxProps, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/sdk-react'
import { ReactNode } from 'react'
interface FeatureCardProps extends BoxProps {
  icon?: ReactNode
  title: string
  desc: string | ReactNode
  to?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, to, title, desc }) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
      }}
      style={{ height: '100%', width: '100%' }}
      elevation={0}
    >
      <CardContent>
        <FlexGrowCol alignItems="flex-start" height="100%">
          <FlexRow alignItems="flex-start">
            <FlexCol marginRight={1}>{icon}</FlexCol>
            <Typography variant="caption" gutterBottom textAlign="left">
              {title}
            </Typography>
          </FlexRow>
          {typeof desc === 'string' ? (
            <Typography variant="body2" gutterBottom textAlign="left">
              {desc}
            </Typography>
          ) : (
            <>{desc}</>
          )}
        </FlexGrowCol>
      </CardContent>
      {to ? (
        <CardActions>
          <Button size="small" color="primary" endIcon={<KeyboardArrowRightIcon fontSize="small" />} href={to}>
            Learn More
          </Button>
        </CardActions>
      ) : null}
    </Card>
  )
}
