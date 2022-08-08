import { MenuItem, Select, SelectProps } from '@mui/material'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { Dispatch, SetStateAction } from 'react'

interface EmbedRenderSelectProps extends SelectProps {
  activePlugin?: XyoPayloadRenderPlugin
  plugins?: XyoPayloadRenderPlugin[]
  setActivePlugin?: Dispatch<SetStateAction<XyoPayloadRenderPlugin>>
}

export const EmbedRenderSelect: React.FC<EmbedRenderSelectProps> = ({ activePlugin, setActivePlugin, plugins, ...props }) => {
  return (
    <Select size="small" value={activePlugin?.name} {...props}>
      {plugins?.map((plugin) => (
        <MenuItem value={plugin.name} key={plugin.name} onClick={() => setActivePlugin?.(plugin)}>
          {plugin.name}
        </MenuItem>
      ))}
    </Select>
  )
}
