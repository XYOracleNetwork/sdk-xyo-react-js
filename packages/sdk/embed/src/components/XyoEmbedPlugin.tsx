import { ListModeProvider } from '@xyo-network/react-shared'

import { XyoEmbedPluginProvider } from '../contexts'
import { EmbedPluginContainer, ValidatePlugins } from './embed-card'
import { XyoEmbedPluginProps } from './XyoEmbedPluginProps'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({ plugins = [], huri, refreshTitle = '', timestampLabel = 'Data From', ...props }) => {
  return (
    <XyoEmbedPluginProvider refreshTitle={refreshTitle} timestampLabel={timestampLabel} plugins={plugins} huri={huri}>
      <ListModeProvider>
        <ValidatePlugins>
          <EmbedPluginContainer {...props} />
        </ValidatePlugins>
      </ListModeProvider>
    </XyoEmbedPluginProvider>
  )
}
