import { XyoPanel } from '@xyo-network/sdk-xyo-client-js'
import { createContext } from 'react'

export const XyoPanelContext = createContext<{ panel?: XyoPanel }>({})
