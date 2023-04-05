import { CircularProgress, Paper, TypographyVariant } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { SizeProp } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

import { PropertyActionsMenu } from './ActionsMenu'
import { IdenticonCorner } from './IdenticonCorner'
import { PropertyBoxProps, PropertyPaperProps, PropertyProps } from './Props'
import { PropertyTitle } from './Title'
import { PropertyValue } from './Value'

const PropertyBox = forwardRef<HTMLDivElement, PropertyBoxProps>(
  ({ titleProps, title, value, children, size = 'medium', tip, actions, required, badge = false, ...props }, ref) => {
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
        {title !== undefined ? (
          <PropertyTitle
            tip={tip}
            title={required ? `${title}*` : title}
            size={size}
            more={<PropertyActionsMenu actions={actions} />}
            {...titleProps}
          />
        ) : null}
        <FlexRow
          pl={1}
          columnGap={1}
          justifyContent={value === undefined ? 'center' : 'space-between'}
          overflow="hidden"
          height={sizeValueHeight[size]}
        >
          {children ? (
            children
          ) : value !== undefined ? (
            <PropertyValue value={value} typographyVariant={sizeVariants[size]} />
          ) : (
            <CircularProgress size={16} />
          )}
          {value !== undefined ? badge ? <IdenticonCorner value={value} /> : null : null}
        </FlexRow>
      </FlexRow>
    )
  },
)
PropertyBox.displayName = 'PropertyBox'

const PropertyPaper = forwardRef<HTMLDivElement, PropertyPaperProps>(({ style, variant, elevation = 2, square, ...props }, ref) => {
  return (
    <Paper ref={ref} style={{ minWidth: 0, overflow: 'hidden', ...style }} variant={variant} elevation={elevation} square={square}>
      <PropertyBox {...props} paper={false} />
    </Paper>
  )
})
PropertyPaper.displayName = 'PropertyPaper'

export const Property = forwardRef<HTMLDivElement, PropertyProps>((props, ref) => {
  return props.paper ? <PropertyPaper ref={ref} {...props} /> : <PropertyBox ref={ref} {...props} />
})
Property.displayName = 'Property'
