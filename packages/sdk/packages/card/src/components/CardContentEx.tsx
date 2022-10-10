import { CardContent, CardContentProps, styled } from '@mui/material'
import { useShareForwardedRef } from '@xyo-network/react-shared'
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
  scrollToTop?: number
  refreshRef?: number
}

export const CardContentExWithRef = forwardRef<HTMLDivElement | null, CardContentExProps>(({ scrollToTop = 0, refreshRef = 0, ...props }, ref) => {
  const sharedRef = useShareForwardedRef<HTMLDivElement>(ref, refreshRef)

  useEffect(() => {
    if (sharedRef && scrollToTop) {
      sharedRef.current?.scroll({ behavior: 'smooth', top: 0 })
    }
  }, [sharedRef, scrollToTop])

  return <CardContentExRoot ref={sharedRef} {...props} />
})

CardContentExWithRef.displayName = 'CardContentEx'

export const CardContentEx = CardContentExWithRef
