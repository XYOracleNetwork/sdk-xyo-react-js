import { XyoPayload } from '@xyo-network/payload'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface XyoEmbedPluginState extends ContextExState {
  activePlugin?: XyoPayloadRenderPlugin
  setActivePlugin?: Dispatch<SetStateAction<XyoPayloadRenderPlugin | undefined>>
  payload?: XyoPayload
  plugins?: XyoPayloadRenderPlugin[]
  refreshHuri?: () => void
  refreshTitle?: string
  timestampLabel?: string
}
