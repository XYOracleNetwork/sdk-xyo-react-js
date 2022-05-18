import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import { Card, CardContent, CardProps, Typography, useTheme } from '@mui/material'
import { ButtonEx, FlexCol, FlexGrowCol, FlexGrowRow, FlexRow } from '@xylabs/sdk-react'
import { ReactNode, useState } from 'react'

export interface RaisedHrefCardProps extends CardProps {
  name: string
  desc?: ReactNode
  href: string
  disabled?: boolean
  image?: ReactNode
}

export const RaisedHrefCard: React.FC<RaisedHrefCardProps> = ({ name, desc, href, image, disabled = false, ...props }) => {
  const theme = useTheme()
  const [raised, setRaised] = useState(false)
  return (
    <Card
      component={ButtonEx}
      href={href}
      target="_blank"
      sx={{ border: '1px solid lightGrey', color: disabled ? 'grey' : 'inherit' }}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      style={{ backgroundColor: disabled ? theme.palette.grey[100] : 'inherit', height: '100%', width: '100%' }}
      elevation={raised ? 3 : 0}
      {...props}
      alignItems="flex-start"
    >
      <CardContent>
        <FlexGrowCol alignItems="flex-start">
          <FlexGrowRow height="100%" justifyContent="space-between" alignSelf="stretch" paddingBottom={1}>
            <FlexRow alignSelf="flex-start">
              <FlexCol marginRight={1}>{image}</FlexCol>
              <Typography variant="body2" fontWeight={700} gutterBottom textAlign="left" color={disabled ? theme.palette.grey[400] : 'inherit'}>
                {name}
              </Typography>
            </FlexRow>
            <LaunchRoundedIcon color="info" sx={{ fontSize: 18 }} />
          </FlexGrowRow>
          <Typography variant="body2" gutterBottom textAlign="left" color={disabled ? theme.palette.grey[400] : theme.palette.grey[600]}>
            {desc}
          </Typography>
        </FlexGrowCol>
      </CardContent>
    </Card>
  )
}
