import { XyoBoundWitness, XyoPanel } from '@xyo-network/sdk-xyo-client-js'
import { createContext } from 'react'

export interface XyoPanelContextProps {
  panel?: XyoPanel
  history?: XyoBoundWitness[]
}

export const XyoPanelContext = createContext<XyoPanelContextProps>({})
