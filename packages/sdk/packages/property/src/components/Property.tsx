import type { TypographyVariant } from '@mui/material'
import { CircularProgress, Paper } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import type { SizeProp } from '@xyo-network/react-shared'
import React from 'react'

import { PropertyActionsMenu } from './ActionsMenu.tsx'
import { IdenticonCorner } from './IdenticonCorner.tsx'
import type {
  PropertyBoxProps, PropertyPaperProps, PropertyProps,
} from './Props.ts'
import { PropertyTitle } from './Title.tsx'
import { PropertyValue } from './Value.tsx'

const PropertyBox = ({
  ref, titleProps, title, value, children, size = 'medium', tip, actions, required, badge = false, ...props
}: PropertyBoxProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const sizeValueHeight: Record<SizeProp, number> = {
    large: 48,
    medium: 36,
    small: 24,
  }

  const sizeVariants: Record<SizeProp, TypographyVariant> = {
    large: 'h6',
    medium: 'body1',
    small: 'body2',
  }

  return (
    <FlexRow ref={ref} flexDirection="column" minWidth={0} alignItems="stretch" overflow="hidden" {...props}>
      {title === undefined
        ? null
        : (
            <PropertyTitle
              tip={tip}
              title={required ? `${title}*` : title}
              size={size}
              more={<PropertyActionsMenu actions={actions} />}
              {...titleProps}
            />
          )}
      <FlexRow
        pl={1}
        columnGap={1}
        justifyContent={value === undefined ? 'center' : 'space-between'}
        overflow="hidden"
        height={sizeValueHeight[size]}
      >
        {children ?? ((value === undefined)
          ? <CircularProgress size={16} />
          : <PropertyValue value={value} typographyVariant={sizeVariants[size]} />)}
        {value === undefined
          ? null
          : badge
            ? <IdenticonCorner value={value} />
            : null}
      </FlexRow>
    </FlexRow>
  )
}
PropertyBox.displayName = 'PropertyBox'

const PropertyPaper = ({
  ref, style, variant, elevation = 2, square, ...props
}: PropertyPaperProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Paper
      ref={ref}
      style={{
        minWidth: 0, overflow: 'hidden', ...style,
      }}
      variant={variant}
      elevation={elevation}
      square={square}
    >
      <PropertyBox {...props} paper={false} />
    </Paper>
  )
}
PropertyPaper.displayName = 'PropertyPaper'

export const Property: React.FC<PropertyProps> = ({ ref, ...props }) => {
  return props.paper ? <PropertyPaper ref={ref} {...props} /> : <PropertyBox ref={ref} {...props} />
}
Property.displayName = 'Property'
