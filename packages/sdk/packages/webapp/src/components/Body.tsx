import { Theme, useMediaQuery } from '@mui/material'
import { FlexBoxProps, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React, { ReactNode } from 'react'

export interface WebAppBodyProps extends FlexBoxProps {
  breadcrumbs?: ReactNode
  disableBreadcrumbGutter?: boolean
  spacing?: string | number
}

export const WebAppBody: React.FC<WebAppBodyProps> = ({ children, spacing = 1, breadcrumbs, disableBreadcrumbGutter, ...props }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const bodyContentStyles: FlexBoxProps = {
    position: isMobile ? 'relative' : 'absolute',
    sx: { inset: isMobile ? 'inherit' : 0 },
  }

  return (
    <FlexGrowCol
      id="webapp-body-flex"
      gap={1}
      paddingY={spacing}
      justifyContent="flex-start"
      alignItems="stretch"
      overflow={isMobile ? 'scroll' : 'hidden'}
      {...props}
    >
      <FlexRow id="webapp-breadcrumb-flex" justifyContent="flex-start" marginX={disableBreadcrumbGutter ? 0 : spacing}>
        {breadcrumbs}
      </FlexRow>
      <FlexGrowCol>
        <FlexGrowCol id="webapp-scrollable-flex" alignItems="stretch" {...bodyContentStyles}>
          {children}
        </FlexGrowCol>
      </FlexGrowCol>
    </FlexGrowCol>
  )
}
