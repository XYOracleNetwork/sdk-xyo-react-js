import { Refresh as RefreshIcon } from '@mui/icons-material'
import type { CardHeaderProps } from '@mui/material'
import { CardHeader, IconButton } from '@mui/material'
import { TypographyEx } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import type { CardExProps } from './CardEx.tsx'
import { CardEx } from './CardEx.tsx'

export interface PageCardProps extends CardExProps {
  action?: ReactNode
  onRefresh?: () => void
  subheader?: CardHeaderProps['subheader']
}

const PageCardWithRef = forwardRef<HTMLDivElement, PageCardProps>(({
  subheader, title, onRefresh, children, action, style, ...props
}, ref) => {
  return (
    <CardEx
      style={{
        backgroundColor: 'transparent', position: 'relative', ...style,
      }}
      elevation={0}
      ref={ref}
      {...props}
    >
      <CardHeader
        title={(
          <TypographyEx variant="h5" gutterBottom>
            {title}
          </TypographyEx>
        )}
        subheader={<TypographyEx variant="subtitle1">{subheader}</TypographyEx>}
        action={
          action ?? (
            <>
              {onRefresh
                ? (
                    <IconButton onClick={() => onRefresh?.()}>
                      <RefreshIcon />
                    </IconButton>
                  )
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
