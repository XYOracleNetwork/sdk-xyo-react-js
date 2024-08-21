import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { PromiseQueue } from '../../classes/index.ts'
import { PromiseQueueContext } from './Context.ts'

export const PromiseQueueProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queue] = useState<PromiseQueue>(new PromiseQueue())

  const value = useMemo(() => ({
    provided: true, queue,
  }), [queue])

  return (
    <PromiseQueueContext.Provider value={value}>
      {children}
    </PromiseQueueContext.Provider>
  )
}
