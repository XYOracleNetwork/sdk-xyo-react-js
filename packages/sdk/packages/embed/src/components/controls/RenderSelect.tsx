import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/react-select'

import { useEmbedPluginState } from '../../contexts'
import { EmbedFormControl } from './EmbedFormControl'

const renderSelectId = 'render-select-id'
const renderSelectLabel = 'Renderer'

export const EmbedRenderSelect: React.FC<SelectExProps<string>> = (props) => {
  const { activePlugin, setActivePlugin, plugins } = useEmbedPluginState()
  return (
    <EmbedFormControl formId={renderSelectId} formLabel={renderSelectLabel}>
      <SelectEx size="small" value={activePlugin?.name} {...props}>
        {plugins?.map((plugin) => (
          <MenuItem value={plugin.name} key={plugin.name} onClick={() => setActivePlugin?.(plugin)}>
            {plugin.name}
          </MenuItem>
        ))}
      </SelectEx>
    </EmbedFormControl>
  )
}
