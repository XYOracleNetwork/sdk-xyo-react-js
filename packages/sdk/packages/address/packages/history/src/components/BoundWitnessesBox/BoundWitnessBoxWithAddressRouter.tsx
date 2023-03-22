import { FlexBoxProps } from '@xylabs/react-flexbox'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useHashSelectionHistory } from '../../hooks'
import { BoundWitnessesBox } from './BoundWitnessesBox'

export const BoundWitnessBoxWithAddressRouter = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const navigate = useNavigate()
  const { clearHistory } = useHashSelectionHistory()

  const sharedRef = useShareForwardedRef(ref)

  const [listenerRef] = useXyoEvent<HTMLDivElement>((noun, _verb, data) => {
    if (noun === 'address' && data) {
      clearHistory?.()
      navigate(`/address/${data}`)
    }
  }, sharedRef)

  return <BoundWitnessesBox ref={listenerRef} {...props} />
})

BoundWitnessBoxWithAddressRouter.displayName = 'BoundWitnessBoxWithAddressRouter'
