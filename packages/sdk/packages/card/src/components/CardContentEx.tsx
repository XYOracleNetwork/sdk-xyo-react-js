import { CardContent, CardContentProps, styled } from '@mui/material'
import { forwardRef, useEffect } from 'react'

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
  scrollToTop?: boolean
}

export const CardContentExWithRef = forwardRef<HTMLDivElement | null, CardContentExProps>(({ scrollToTop, ...props }, ref) => {
  useEffect(() => {
    if (ref !== null && typeof ref === 'object') {
      ref?.current?.scroll({ behavior: 'smooth', top: 0 })
    }
  }, [ref, scrollToTop])
  return <CardContentExRoot ref={ref} {...props} />
})

CardContentExWithRef.displayName = 'CardContentEx'

export const CardContentEx = CardContentExWithRef
