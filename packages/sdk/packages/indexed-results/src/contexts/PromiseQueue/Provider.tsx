import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import { PromiseQueue } from '../../classes/index.ts'
import { PromiseQueueContext } from './Context.ts'
import type { PromiseQueueState } from './State.ts'

export const PromiseQueueProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const value: PromiseQueueState = useMemo(() => ({ provided: true, queue: new PromiseQueue() }), [])

  return (
    <PromiseQueueContext value={value}>
      {children}
    </PromiseQueueContext>
  )
}
