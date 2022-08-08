import { useContext } from 'react'

import { XyoEmbedPluginContext } from './Context'

export const useXyoEmbedPluginState = () => {
  const context = useContext(XyoEmbedPluginContext)

  if (context === undefined) {
    console.warn('useXyoEmbedPluginState must be used within an XyoEmbedPluginContext')
  }

  return context
}
