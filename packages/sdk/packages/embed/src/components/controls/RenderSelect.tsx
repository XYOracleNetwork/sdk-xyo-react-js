import { MenuItem } from '@mui/material'
import type { SelectExProps } from '@xylabs/react-select'
import { SelectEx } from '@xylabs/react-select'
import React from 'react'

import { useEmbedPluginState } from '../../contexts/index.ts'
import { EmbedFormControl } from './EmbedFormControl.tsx'

const renderSelectId = 'render-select-id'
const renderSelectLabel = 'Renderer'

export const EmbedRenderSelect: React.FC<SelectExProps<string>> = (props) => {
  const { activePlugin, setActivePlugin, plugins } = useEmbedPluginState()
  return (
    <EmbedFormControl formId={renderSelectId} formLabel={renderSelectLabel}>
      <SelectEx size="small" value={activePlugin?.name} {...props}>
        {plugins?.map(plugin => (
          <MenuItem value={plugin.name} key={plugin.name} onClick={() => setActivePlugin?.(plugin)}>
            {plugin.name}
          </MenuItem>
        ))}
      </SelectEx>
    </EmbedFormControl>
  )
}
