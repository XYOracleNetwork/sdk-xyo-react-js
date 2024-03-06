import { Refresh as RefreshIcon } from '@mui/icons-material'
import { CardHeader, CardHeaderProps, IconButton } from '@mui/material'
import { TypographyEx } from '@xyo-network/react-shared'
import { forwardRef, ReactNode } from 'react'

import { CardEx, CardExProps } from './CardEx'

export interface PageCardProps extends CardExProps {
  action?: ReactNode
  onRefresh?: () => void
  subheader?: CardHeaderProps['subheader']
}

const PageCardWithRef = forwardRef<HTMLDivElement, PageCardProps>(({ subheader, title, onRefresh, children, action, style, ...props }, ref) => {
  return (
    <CardEx style={{ backgroundColor: 'transparent', position: 'relative', ...style }} elevation={0} ref={ref} {...props}>
      <CardHeader
        title={
          <TypographyEx variant="h5" gutterBottom>
            {title}
          </TypographyEx>
        }
        subheader={<TypographyEx variant="subtitle1">{subheader}</TypographyEx>}
        action={
          action ?? (
            <>
              {onRefresh ?
                <IconButton onClick={() => onRefresh?.()}>
                  <RefreshIcon />
                </IconButton>
              : null}
            </>
          )
        }
      />
      {children}
    </CardEx>
  )
})

PageCardWithRef.displayName = 'PageCard'

export const PageCard = PageCardWithRef
