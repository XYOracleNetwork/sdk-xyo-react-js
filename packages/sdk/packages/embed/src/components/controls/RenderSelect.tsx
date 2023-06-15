import { MenuItem, Select, SelectProps } from '@mui/material'

import { useEmbedPluginState } from '../../contexts'
import { EmbedFormControl } from './EmbedFormControl'

const renderSelectId = 'render-select-id'
const renderSelectLabel = 'Renderer'

export const EmbedRenderSelect: React.FC<SelectProps> = (props) => {
  const { activePlugin, setActivePlugin, plugins } = useEmbedPluginState()
  return (
    <EmbedFormControl formId={renderSelectId} formLabel={renderSelectLabel}>
      <Select size="small" value={activePlugin?.name} {...props}>
        {plugins?.map((plugin) => (
          <MenuItem value={plugin.name} key={plugin.name} onClick={() => setActivePlugin?.(plugin)}>
            {plugin.name}
          </MenuItem>
        ))}
      </Select>
    </EmbedFormControl>
  )
}
