import { CircularProgress, Grid, Paper, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow, Identicon } from '@xylabs/sdk-react'

import { PropertyActions } from './PropertyActions'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { Value } from './Value'

export const Property: React.FC<PropertyProps> = (props) => {
  const theme = useTheme()
  const belowSm = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    title,
    value,
    children,
    isHero = false,
    maxTitleWidth = 180,
    paddingFactor = 1,
    tip,
    actions,
    required,
    ...boxProps
  } = props

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
          <Grid display="flex" xs={12} sm={isHero ? 12 : 'auto'} item={true} alignItems="start">
            <PropertyTitle
              isHero={isHero}
              maxWidth={isHero ? 'auto' : maxTitleWidth}
              tip={tip}
              title={title}
              paddingFactor={paddingFactor}
            />
            {isHero && typeof value === 'string' && (
              <Paper
                elevation={1}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '25px',
                  padding: theme.spacing(1),
                  position: 'absolute',
                  right: '-20px',
                  top: '-20px',
                }}
              >
                <Identicon size={25} value={value} />
              </Paper>
            )}
          </Grid>
        ) : null}
        <Grid
          borderTop={belowSm && title ? `1px solid ${theme.palette.divider}` : 'none'}
          sx={{ flexGrow: '1 !important' }}
          display="flex"
          xs={12}
          sm={'auto'}
          item={true}
          alignItems="center"
        >
          {value === undefined ? (
            <FlexGrowRow padding={paddingFactor}>
              <CircularProgress size={16} />
            </FlexGrowRow>
          ) : (
            <>
              {children ? children : <Value value={value} paddingFactor={paddingFactor} />}
              <PropertyActions actions={actions} marginX={2} />
            </>
          )}
        </Grid>
      </Grid>
    </FlexRow>
  )
}
