import RefreshIcon from '@mui/icons-material/Refresh'
import { CardHeader, CardHeaderProps, CardProps, IconButton, SvgIconProps } from '@mui/material'
import { ReactNode } from 'react'

import { CardEx } from './CardEx'
import { TypographyEx } from './TypographyEx'

export interface PageCardProps extends CardProps {
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
          <TypographyEx variant="h4" gradient="text">
            {title}
          </TypographyEx>
        }
        subheader={subheader}
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
