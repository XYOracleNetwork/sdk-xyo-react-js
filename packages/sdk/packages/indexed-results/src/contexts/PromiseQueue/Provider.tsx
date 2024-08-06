import React, { PropsWithChildren, useState } from 'react'

import { PromiseQueue } from '../../classes/index.js'
import { PromiseQueueContext } from './Context.js'

export const PromiseQueueProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queue] = useState<PromiseQueue>(new PromiseQueue())

  return <PromiseQueueContext.Provider value={{ provided: true, queue }}>{children}</PromiseQueueContext.Provider>
}
