import type {
  DetailedHTMLProps, HTMLAttributes, PropsWithChildren,
} from 'react'
import React, {
  useEffect, useLayoutEffect, useRef,
} from 'react'

import { useNestedBoundWitnesses } from '../../../hooks/index.ts'
import { StyledGlowingDiv } from './StyledGlowingDiv.tsx'

export interface GlowingDivProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, PropsWithChildren {
  hash?: string
}

export const GlowingDiv = ({
  ref, hash, children, ...props
}: GlowingDivProps) => {
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
        const timeout = setTimeout(() => {
          // once animation is complete, remove classes and reset existing hash
          internalRef?.current?.classList.add('no-glow')
          internalRef?.current?.classList.remove('glow-2')
          setClickedExistingHash?.(undefined)
        }, 1000)
        return () => clearTimeout(timeout)
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
}

GlowingDiv.displayName = 'GlowingDiv'
