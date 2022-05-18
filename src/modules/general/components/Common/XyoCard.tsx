import { ArrowRightAltRounded } from '@mui/icons-material'
import { alpha, Card, CardActions, CardContent, CardMedia, CardProps, Typography, useTheme } from '@mui/material'
import { ButtonEx, FlexCol, FlexGrowCol, FlexRow } from '@xylabs/sdk-react'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

export interface XyoCardProps extends CardProps {
  name: ReactNode
  subtitle?: string
  desc?: ReactNode
  actions?: ReactNode
  href?: string
  to?: To
  linkText?: string
  disabled?: boolean
  icon?: ReactNode
  image?: string
}

export const XyoCard: React.FC<XyoCardProps> = ({ name, image, actions, desc, href, subtitle, to, icon, linkText, disabled = false, ...props }) => {
  const theme = useTheme()
  return (
    <Card
      sx={{ color: disabled ? 'grey' : 'inherit' }}
      style={{
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        height: '100%',
        width: '100%',
      }}
      {...props}
      variant="outlined"
    >
      {image ? (
        <FlexRow padding={2}>
          <CardMedia component="img" width="30%" image={image} alt={image} />
        </FlexRow>
      ) : null}
      <FlexGrowCol height="100%" justifyContent="space-between" alignItems="stretch">
        <CardContent>
          <FlexGrowCol alignItems="flex-start">
            <FlexRow alignItems="flex-start">
              <FlexCol marginRight={1}>{icon}</FlexCol>
              <Typography variant="caption" gutterBottom textAlign="left" color={disabled ? theme.palette.grey[400] : 'inherit'}>
                {subtitle}
              </Typography>
            </FlexRow>
            <Typography variant="h6" gutterBottom textAlign="left" color={disabled ? theme.palette.grey[400] : 'inherit'}>
              {name}
            </Typography>
            <Typography variant="body2" gutterBottom textAlign="left" color={disabled ? theme.palette.grey[400] : 'inherit'}>
              {desc}
            </Typography>
          </FlexGrowCol>
        </CardContent>
        {actions ?? (
          <CardActions>
            <ButtonEx color="primary" variant="text" href={href} disabled={href || to ? false : true} to={to} endIcon={<ArrowRightAltRounded />} size="small">
              {linkText ?? (to || href) ? 'Learn More' : 'More Info Coming Soon!'}
            </ButtonEx>
          </CardActions>
        )}
      </FlexGrowCol>
    </Card>
  )
}
