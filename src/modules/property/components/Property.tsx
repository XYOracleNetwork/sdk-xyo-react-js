import { CircularProgress, Divider, Grid, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/sdk-react'

import { IdenticonCorner } from './IdenticonCorner'
import { PropertyActions } from './PropertyActions'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { PropertyValue } from './Value'

export const Property: React.FC<PropertyProps> = ({
  title,
  value,
  children,
  hero = false,
  maxTitleWidth = 180,
  paddingFactor = 1,
  tip,
  actions,
  stackBreak = 'xs',
  required,
  size,
  badge = false,
  gridContainerProps,
  ...props
}) => {
  const theme = useTheme()
  const belowStackBreak = useMediaQuery(theme.breakpoints.down(stackBreak))
  const minHeight = 48

  const TitleGridItem: React.FC = () => {
    return title ? (
      <Grid display="flex" xs={12} {...{ [stackBreak]: hero ? 12 : 'auto' }} item alignItems="center" justifyContent="space-between">
        <PropertyTitle hero={hero} maxWidth={hero ? 'auto' : maxTitleWidth} minHeight={minHeight} tip={tip} title={title} paddingFactor={paddingFactor} />
        {belowStackBreak ? <PropertyActions marginRight={badge ? 3 : 0} justifyContent="flex-end" actions={actions} /> : null}
        {badge && typeof value === 'string' && <IdenticonCorner value={value} />}
      </Grid>
    ) : null
  }

  const ChildrenGridItem: React.FC = () => {
    return (
      <Grid borderTop={belowStackBreak && title ? `1px solid ${theme.palette.divider}` : 'none'} display="flex" xs={12} {...{ [stackBreak]: 'auto' }} item alignItems="center">
        {value === undefined ? (
          <FlexGrowRow minHeight={minHeight} padding={paddingFactor}>
            <CircularProgress size={16} />
          </FlexGrowRow>
        ) : (
          <>{children ? children : <PropertyValue value={value} paddingFactor={paddingFactor} typographyVariant={hero ? 'h6' : undefined} />}</>
        )}
      </Grid>
    )
  }

  const sizedHeight = (size === 'small' ? 40 : 56) * (belowStackBreak ? 2 : 1)

  return (
    <FlexRow
      height={sizedHeight}
      alignItems="center"
      border={1}
      borderColor={required && value === undefined ? theme.palette.error.main : theme.palette.divider}
      borderRadius={1}
      {...props}
    >
      <Grid container flexWrap={belowStackBreak ? 'wrap' : 'nowrap'} justifyContent="space-between" overflow="hidden" {...gridContainerProps}>
        <TitleGridItem />
        <Divider orientation="vertical" />
        {children ? null : <FlexGrowRow />}
        <ChildrenGridItem />
        {belowStackBreak ? null : (
          <Grid display="flex" xs="auto" item marginRight={badge ? 4 : 0}>
            <PropertyActions actions={actions} />
          </Grid>
        )}
      </Grid>
    </FlexRow>
  )
}
