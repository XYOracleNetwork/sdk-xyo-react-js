import { XyoPayload } from '@xyo-network/payload'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { useListMode } from '@xyo-network/react-shared'

interface RenderComponentProps {
  ActivePlugin?: XyoPayloadRenderPlugin
  payload?: XyoPayload
}

export const RenderComponent: React.FC<RenderComponentProps> = ({ ActivePlugin, payload }) => {
  const { listMode } = useListMode()
  return <>{ActivePlugin ? <ActivePlugin.components.box.details payload={payload} listMode={listMode} /> : null}</>
}
