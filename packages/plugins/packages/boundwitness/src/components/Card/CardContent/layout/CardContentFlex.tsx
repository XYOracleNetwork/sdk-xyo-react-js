import { alpha, CardContent, styled } from '@mui/material'

export interface CardContentFlexProps {
  active?: boolean
}

export const CardContentFlex = styled(CardContent, { name: 'CardContentFlex', shouldForwardProp: (prop) => prop !== 'active' })<CardContentFlexProps>(
  ({ theme, active }) => ({
    [':last-child']: {
      paddingBottom: theme.spacing(1),
    },
    ...(active && { background: alpha(theme.palette.secondary.dark, 0.33) }),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: theme.spacing(1),
  }),
)
