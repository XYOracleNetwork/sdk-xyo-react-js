import { CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/sdk-react'

import { IdenticonCorner } from './IdenticonCorner'
import { PropertyActions } from './PropertyActions'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { Value } from './Value'

export const Property: React.FC<PropertyProps> = ({
  title,
  value,
  children,
  hero = false,
  maxTitleWidth = 180,
  paddingFactor = 1,
  tip,
  actions,
  required,
  showBadge = false,
  ...props
}) => {
  const theme = useTheme()
  const belowSm = useMediaQuery(theme.breakpoints.down('sm'))
  const minHeight = 48

  return (
    <FlexRow
      alignItems="center"
      margin={0.5}
      border={1}
      borderColor={required && value === undefined ? theme.palette.error.main : theme.palette.divider}
      borderRadius={1}
      {...props}
    >
      <Grid container>
        {title ? (
          <Grid display="flex" xs={12} sm={hero ? 12 : 'auto'} item alignItems="center" justifyContent="space-between">
            <PropertyTitle
              hero={hero}
              maxWidth={hero ? 'auto' : maxTitleWidth}
              minHeight={minHeight}
              tip={tip}
              title={title}
              paddingFactor={paddingFactor}
            />
            {belowSm ? <PropertyActions actions={actions} /> : null}
            {showBadge && typeof value === 'string' && <IdenticonCorner value={value} />}
          </Grid>
        ) : null}
        <Grid
          borderTop={belowSm && title ? `1px solid ${theme.palette.divider}` : 'none'}
          display="flex"
          xs={12}
          sm={'auto'}
          item
          alignItems="center"
        >
          {value === undefined ? (
            <FlexGrowRow minHeight={minHeight} padding={paddingFactor}>
              <CircularProgress size={16} />
            </FlexGrowRow>
          ) : (
            <>
              {children ? (
                children
              ) : (
                <Value value={value} paddingFactor={paddingFactor} typographyVariant={hero ? 'h6' : undefined} />
              )}
              {belowSm ? null : <PropertyActions actions={actions} />}
            </>
          )}
        </Grid>
      </Grid>
    </FlexRow>
  )
}
