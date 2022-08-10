import { CircularProgress, Paper, TypographyVariant } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { SizeProp } from '@xyo-network/react-shared'

import { PropertyActionsMenu } from './ActionsMenu'
import { IdenticonCorner } from './IdenticonCorner'
import { PropertyBoxProps, PropertyPaperProps, PropertyProps } from './Props'
import { PropertyTitle } from './Title'
import { PropertyValue } from './Value'

const PropertyBox: React.FC<PropertyBoxProps> = ({
  titleProps,
  title,
  value,
  children,
  size = 'medium',
  tip,
  actions,
  required,
  badge = false,
  ...props
}) => {
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
    <FlexRow flexDirection="column" minWidth={0} alignItems="stretch" overflow="hidden" {...props}>
      {title !== undefined ? (
        <PropertyTitle
          tip={tip}
          title={required ? `${title}*` : title}
          size={size}
          more={<PropertyActionsMenu actions={actions} />}
          {...titleProps}
        />
      ) : null}
      <FlexRow paddingX={1} justifyContent={value === undefined ? 'center' : 'space-between'} overflow="hidden" height={sizeValueHeight[size]}>
        {children ? (
          children
        ) : value !== undefined ? (
          <PropertyValue shortSpace={badge ? sizeValueHeight[size] : 0} value={value} typographyVariant={sizeVariants[size]} />
        ) : (
          <CircularProgress size={16} />
        )}
        {value !== undefined ? badge ? <IdenticonCorner value={value} /> : null : null}
      </FlexRow>
    </FlexRow>
  )
}

const PropertyPaper: React.FC<PropertyPaperProps> = ({ style, variant, elevation = 2, square, ...props }) => {
  return (
    <Paper style={{ minWidth: 0, overflow: 'hidden', ...style }} variant={variant} elevation={elevation} square={square}>
      <PropertyBox {...props} paper={false} />
    </Paper>
  )
}

export const Property: React.FC<PropertyProps> = (props) => {
  return props.paper ? <PropertyPaper {...props} /> : <PropertyBox {...props} />
}
