import { CardActionArea, CardActionAreaProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { XyoModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleCardActionArea: React.FC<CardActionAreaProps & ModuleRenderProps> = ({ children, module, ...props }) => {
  const wrapper = module ? new XyoModuleWrapper(module) : undefined
  return (
    <CardActionArea {...props}>
      <ButtonEx onClick={() => wrapper?.discover()}>Discover</ButtonEx>
      {children}
    </CardActionArea>
  )
}
