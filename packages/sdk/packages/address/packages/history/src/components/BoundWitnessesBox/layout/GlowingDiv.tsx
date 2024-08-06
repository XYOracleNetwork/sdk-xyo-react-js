import { WithChildren } from '@xylabs/react-shared'
import React, { DetailedHTMLProps, forwardRef, HTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react'

import { useNestedBoundWitnesses } from '../../../hooks/index.js'
import { StyledGlowingDiv } from './StyledGlowingDiv.js'

export interface GlowingDivProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, WithChildren {
  hash?: string
}

export const GlowingDiv = forwardRef<HTMLDivElement, GlowingDivProps>(({ hash, children, ...props }, ref) => {
  const { clickedExistingHash, setClickedExistingHash } = useNestedBoundWitnesses()
  const internalRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    // update the parent ref with the internal parent
    if (typeof ref === 'function') {
      ref(internalRef.current)
    }
  })

  useEffect(() => {
    if (internalRef?.current && hash) {
      if (clickedExistingHash === hash) {
        // update classes when we have a match
        internalRef.current.classList.remove('no-glow')
        internalRef.current.classList.add('glow-2')
        setTimeout(() => {
          // once animation is complete, remove classes and reset existing hash
          internalRef?.current?.classList.add('no-glow')
          internalRef?.current?.classList.remove('glow-2')
          setClickedExistingHash?.(undefined)
        }, 1000)
      } else if (clickedExistingHash !== undefined) {
        // not a match so don't animate
        internalRef.current.classList.add('no-glow')
      }
    }
  }, [clickedExistingHash, ref, hash, setClickedExistingHash])

  return (
    <StyledGlowingDiv {...props} ref={internalRef}>
      {children}
    </StyledGlowingDiv>
  )
})

GlowingDiv.displayName = 'GlowingDiv'
