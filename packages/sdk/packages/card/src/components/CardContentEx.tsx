import type { CardContentProps } from '@mui/material'
import { CardContent, styled } from '@mui/material'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import React, { useEffect } from 'react'

const CardContentExRoot = styled(CardContent, {
  name: 'CardContentEx',
  shouldForwardProp: (prop: string) => !['variant', 'removePadding'].includes(prop),
  slot: 'Root',
})<CardContentExProps>(({ variant, removePadding }) => ({
  ...((variant === 'scrollable' || removePadding) && {
    [':last-child']: { paddingBottom: 0 },
    overflow: 'auto',
    paddingTop: 0,
    ...(removePadding && { padding: 0 }),
  }),
}))

export type CardContentExProps = CardContentProps & {
  refreshRef?: number
  removePadding?: boolean
  scrollToTop?: number
  variant?: 'scrollable' | 'normal'
}

export const CardContentExWithRef = ({
  ref, scrollToTop = 0, refreshRef = 0, ...props
}: CardContentExProps & { ref?: React.RefObject<HTMLDivElement | null | null> }) => {
  const sharedRef = useShareForwardedRef<HTMLDivElement>(ref, refreshRef)

  useEffect(() => {
    if (sharedRef && scrollToTop) {
      sharedRef.current?.scroll({ behavior: 'smooth', top: 0 })
    }
  }, [sharedRef, scrollToTop])

  return <CardContentExRoot ref={sharedRef} {...props} />
}

CardContentExWithRef.displayName = 'CardContentEx'

export const CardContentEx = CardContentExWithRef
