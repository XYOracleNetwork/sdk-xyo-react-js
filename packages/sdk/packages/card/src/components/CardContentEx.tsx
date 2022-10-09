import { CardContent, CardContentProps, styled } from '@mui/material'
import { forwardRef } from 'react'

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

export const CardContentExWithRef: React.FC<CardContentExProps> = forwardRef((props, ref) => {
  return <CardContentExRoot ref={ref} {...props} />
})

CardContentExWithRef.displayName = 'CardContentEx'

export const CardContentEx = CardContentExWithRef
