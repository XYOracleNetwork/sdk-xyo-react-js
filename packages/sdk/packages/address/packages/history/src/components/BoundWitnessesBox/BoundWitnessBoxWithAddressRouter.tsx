import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { useEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePayloadHashSelectionHistory } from '../../hooks/index.ts'
import { BoundWitnessesBox } from './BoundWitnessesBox.tsx'

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
        void navigate(`${baseRoute}/${data}`)
      }
    }, sharedRef)

    return <BoundWitnessesBox ref={listenerRef} {...props} />
  },
)

BoundWitnessBoxWithAddressRouter.displayName = 'BoundWitnessBoxWithAddressRouter'
