import { MenuItem, Select } from '@mui/material'

import { useXyoEmbedPluginState } from '../../contexts'
import { EmbedControlWrap } from './ControlWrap'

const renderSelectId = 'render-select-id'
const renderSelectLabel = 'Renderer'

export const EmbedRenderSelect: React.FC = (props) => {
  const { activePlugin, setActivePlugin, plugins } = useXyoEmbedPluginState()
  return (
    <EmbedControlWrap formId={renderSelectId} formLabel={renderSelectLabel}>
      <Select size="small" value={activePlugin?.name} {...props}>
        {plugins?.map((plugin) => (
          <MenuItem value={plugin.name} key={plugin.name} onClick={() => setActivePlugin?.(plugin)}>
            {plugin.name}
          </MenuItem>
        ))}
      </Select>
    </EmbedControlWrap>
  )
}
