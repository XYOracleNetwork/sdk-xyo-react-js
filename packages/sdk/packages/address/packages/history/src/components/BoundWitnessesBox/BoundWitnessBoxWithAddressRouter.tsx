import { FlexBoxProps } from '@xylabs/react-flexbox'
import { useEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePayloadHashSelectionHistory } from '../../hooks/index.js'
import { BoundWitnessesBox } from './BoundWitnessesBox.js'

export interface BoundWitnessBoxWithAddressRouterProps extends FlexBoxProps {
  baseRoute?: string
}

export const BoundWitnessBoxWithAddressRouter = forwardRef<HTMLDivElement, BoundWitnessBoxWithAddressRouterProps>(
  ({ baseRoute = '/address/', ...props }, ref) => {
    const navigate = useNavigate()
    const { clearHistory } = usePayloadHashSelectionHistory()

    const sharedRef = useShareForwardedRef(ref)

    const [listenerRef] = useEvent<HTMLDivElement>((noun, _verb, data) => {
      if (noun === 'address' && data) {
        clearHistory?.()
        navigate(`${baseRoute}/${data}`)
      }
    }, sharedRef)

    return <BoundWitnessesBox ref={listenerRef} {...props} />
  },
)

BoundWitnessBoxWithAddressRouter.displayName = 'BoundWitnessBoxWithAddressRouter'
