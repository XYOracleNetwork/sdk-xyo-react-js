import { CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/sdk-react'

import { PropertyActions } from './PropertyActions'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { Value } from './Value'

export const Property: React.FC<PropertyProps> = (props) => {
  const theme = useTheme()
  const belowSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { title, value, children, maxTitleWidth = 180, tip, actions, required, ...boxProps } = props

  return (
    <FlexRow
      alignItems="center"
      margin={0.5}
      border={1}
      borderColor={required && value === undefined ? theme.palette.error.main : theme.palette.divider}
      borderRadius={1}
      {...boxProps}
    >
      <Grid container>
        {title ? (
          <Grid display="flex" xs={12} sm="auto" item={true} minHeight={56} alignItems="start">
            <PropertyTitle maxWidth={maxTitleWidth} tip={tip} title={title} />
          </Grid>
        ) : null}
        <Grid
          borderTop={belowSm && title ? `1px solid ${theme.palette.divider}` : 'none'}
          sx={{ flexGrow: '1 !important' }}
          display="flex"
          xs={12}
          sm={'auto'}
          item={true}
          minHeight={56}
          alignItems="center"
        >
          {value === undefined ? (
            <FlexGrowRow>
              <CircularProgress size={16} />
            </FlexGrowRow>
          ) : (
            <>
              {children ? children : <Value value={value} />}
              <PropertyActions actions={actions} marginX={2} />
            </>
          )}
        </Grid>
      </Grid>
    </FlexRow>
  )
}
