import { Avatar, AvatarProps, CardHeader, CardHeaderProps, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'

export interface TokenSummaryProps extends CardHeaderProps {
  icon?: string
  symbol?: string
  symbolElement?: ReactNode
  imgBgProps?: AvatarProps
}

export const TokenSummary: React.FC<TokenSummaryProps> = ({ imgBgProps = {}, icon, symbol, symbolElement, children, ...props }) => {
  const theme = useTheme()
  const avatarProps = {
    ...imgBgProps,
    sx: {
      background: theme.palette.common.white,
      height: '40px',
      padding: theme.spacing(0.25),
      ...imgBgProps.sx,
    },
  }
  return (
    <>
      <CardHeader
        avatar={<Avatar src={icon} alt={symbol} {...avatarProps} />}
        title={
          <Typography variant="h6" fontWeight={300} textTransform="uppercase">
            {symbolElement ?? symbol}
          </Typography>
        }
        {...props}
      />
      {children}
    </>
  )
}
