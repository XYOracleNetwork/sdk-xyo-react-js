import RefreshIcon from '@mui/icons-material/Refresh'
import { CardHeader, CardHeaderProps, IconButton } from '@mui/material'
import { TypographyEx } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { CardEx, CardExProps } from './CardEx'

export interface PageCardProps extends CardExProps {
  onRefresh?: () => void
  subheader?: CardHeaderProps['subheader']
  action?: ReactNode
}

export const PageCard: React.FC<PageCardProps> = ({ subheader, title, onRefresh, children, action, style, ...props }) => {
  return (
    <CardEx style={{ backgroundColor: 'transparent', position: 'relative', ...style }} elevation={0} {...props}>
      <CardHeader
        title={
          <TypographyEx variant="h5" gutterBottom>
            {title}
          </TypographyEx>
        }
        subheader={<TypographyEx variant="subtitle1">{subheader}</TypographyEx>}
        action={
          action ? (
            action
          ) : (
            <>
              {onRefresh ? (
                <IconButton onClick={() => onRefresh?.()}>
                  <RefreshIcon />
                </IconButton>
              ) : null}
            </>
          )
        }
      />
      {children}
    </CardEx>
  )
}
