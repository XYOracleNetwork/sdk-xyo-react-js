import { StyledComponentProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { BoundWitnessDetailsCard } from '@xyo-network/react-plugins'
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'

import { useNestedBoundWitnesses } from '../../../contexts'
import { StyledGlowingDiv } from './layout'

export interface NestedBoundWitnessProps extends StyledComponentProps<'div'> {
  boundwitness?: XyoBoundWitness
  index?: number
  hash?: string
}

export const NestedBoundWitnessBox = forwardRef<HTMLDivElement, NestedBoundWitnessProps>(({ boundwitness, hash, index, ...props }, ref) => {
  const { clickedExistingHash, setClickedExistingHash } = useNestedBoundWitnesses()
  const internalRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    // update the parent ref with the internal parent
    if (typeof ref === 'function') {
      ref(internalRef.current)
    }
  })

  useEffect(() => {
    if (internalRef?.current) {
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
      <BoundWitnessDetailsCard payload={boundwitness} active={index !== 0} />
    </StyledGlowingDiv>
  )
})

NestedBoundWitnessBox.displayName = 'NestedBoundWitnessBox'
