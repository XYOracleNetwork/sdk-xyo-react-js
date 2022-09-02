import RefreshIcon from '@mui/icons-material/Refresh'
import { CardHeader, CardHeaderProps, IconButton, SvgIconProps, useTheme } from '@mui/material'
import { TypographyEx } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { CardEx, CardExProps } from './CardEx'

export interface PageCardProps extends CardExProps {
  icon?: (props?: SvgIconProps) => ReactNode
  onRefresh?: () => void
  subheader?: CardHeaderProps['subheader']
}

export const PageCard: React.FC<PageCardProps> = ({ subheader, title, icon, onRefresh, children, style, ...props }) => {
  return (
    <CardEx style={{ position: 'relative', ...style }} {...props}>
      {icon?.({ style: { fontSize: 512, left: '-144px', opacity: 0.05, position: 'absolute', top: '-144px' } })}
      <CardHeader
        title={
          <TypographyEx variant="h5" gutterBottom>
            {title}
          </TypographyEx>
        }
        subheader={<TypographyEx variant="subtitle1">{subheader}</TypographyEx>}
        action={
          <>
            {onRefresh ? (
              <IconButton onClick={() => onRefresh?.()}>
                <RefreshIcon />
              </IconButton>
            ) : null}
          </>
        }
      />
      {children}
    </CardEx>
  )
}
