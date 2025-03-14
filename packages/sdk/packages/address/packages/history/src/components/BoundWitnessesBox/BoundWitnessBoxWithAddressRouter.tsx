import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { useEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import type { Ref } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { usePayloadHashSelectionHistory } from '../../hooks/index.ts'
import { BoundWitnessesBox } from './BoundWitnessesBox.tsx'

export interface BoundWitnessBoxWithAddressRouterProps extends FlexBoxProps {
  baseRoute?: string
  ref?: Ref<HTMLDivElement>
}

export const BoundWitnessBoxWithAddressRouter = ({
  ref, baseRoute = '/address/', ...props
}: BoundWitnessBoxWithAddressRouterProps) => {
  const navigate = useNavigate()
  const { clearHistory } = usePayloadHashSelectionHistory()

  const sharedRef = useShareForwardedRef<HTMLDivElement>(ref)

  const [listenerRef] = useEvent<HTMLDivElement>((noun, _verb, data) => {
    if (noun === 'address' && data) {
      clearHistory?.()
      void navigate(`${baseRoute}/${data}`)
    }
  }, sharedRef)

  return <BoundWitnessesBox ref={listenerRef} {...props} />
}

BoundWitnessBoxWithAddressRouter.displayName = 'BoundWitnessBoxWithAddressRouter'
