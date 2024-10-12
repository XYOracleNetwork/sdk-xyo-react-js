import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import { PromiseQueue } from '../../classes/index.ts'
import { PromiseQueueContext } from './Context.ts'

export const PromiseQueueProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const value = useMemo(() => ({ provided: true, queue: new PromiseQueue() }), [])

  return (
    <PromiseQueueContext.Provider value={value}>
      {children}
    </PromiseQueueContext.Provider>
  )
}
