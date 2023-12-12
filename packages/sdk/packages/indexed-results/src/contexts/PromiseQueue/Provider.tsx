import { PropsWithChildren, useState } from 'react'

import { PromiseQueue } from '../../classes'
import { PromiseQueueContext } from './Context'

export const PromiseQueueProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queue] = useState<PromiseQueue>(new PromiseQueue())

  return <PromiseQueueContext.Provider value={{ provided: true, queue }}>{children}</PromiseQueueContext.Provider>
}
