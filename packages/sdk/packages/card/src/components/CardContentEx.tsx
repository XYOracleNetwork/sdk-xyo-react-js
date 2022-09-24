import { CardContent, CardContentProps, styled } from '@mui/material'

const CardContentExRoot = styled(CardContent, {
  name: 'CardContentEx',
  shouldForwardProp: (prop) => prop !== 'variant',
  slot: 'Root',
})<CardContentExProps>(({ variant }) => ({
  ...(variant === 'scrollable' && {
    [':last-child']: {
      paddingBottom: 0,
    },
    overflow: 'auto',
    paddingTop: 0,
  }),
}))

export type CardContentExProps = CardContentProps & {
  variant?: 'scrollable' | 'normal'
}

export const CardContentEx: React.FC<CardContentExProps> = (props) => {
  return <CardContentExRoot {...props} />
}
