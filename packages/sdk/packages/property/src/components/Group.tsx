import { Paper, useTheme } from '@mui/material'
import { FlexCol, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { typeOf } from '@xyo-network/typeof'
import { ReactElement } from 'react'

import { PropertyGroupBoxProps, PropertyGroupPaperProps, PropertyGroupProps } from './Props.js'
import { PropertyTitle } from './Title.js'

const PropertyGroupBox: React.FC<PropertyGroupBoxProps> = ({ titleProps, children, title, tip, ...props }) => {
  const theme = useTheme()
  const childrenArray = typeOf(children) === 'array' ? (children as ReactElement[]) : undefined
  return (
    <FlexCol alignItems="stretch" overflow="hidden" {...props}>
      <FlexRow overflow="hidden" justifyContent="stretch" alignItems="stretch">
        <PropertyTitle alignItems="flex-start" size="full" title={title} tip={tip} {...titleProps} />
        {childrenArray ?
          <FlexGrowRow>
            {childrenArray?.map((child, index) => {
              return child ?
                  <FlexGrowRow key={index} borderLeft={1} borderColor={theme.palette.divider}>
                    {child}
                  </FlexGrowRow>
                : null
            })}
          </FlexGrowRow>
        : <FlexGrowRow overflow="hidden">{children}</FlexGrowRow>}
      </FlexRow>
    </FlexCol>
  )
}

const PropertyGroupPaper: React.FC<PropertyGroupPaperProps> = ({ style, variant, elevation, square, ...props }) => {
  return (
    <Paper style={{ minWidth: 0, overflow: 'hidden', ...style }} variant={variant} elevation={elevation} square={square}>
      <PropertyGroupBox {...props} paper={false} />
    </Paper>
  )
}

export const PropertyGroup: React.FC<PropertyGroupProps> = (props) => {
  return props.paper ? <PropertyGroupPaper {...props} /> : <PropertyGroupBox {...props} />
}
