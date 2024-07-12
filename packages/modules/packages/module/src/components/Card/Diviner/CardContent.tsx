import { CardContentProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps.js'
import { ModuleCardContent } from '../Module/index.js'

export const DivinerCardContent: React.FC<ModuleRenderProps<DivinerInstance> & CardContentProps> = ({ children, ...props }) => {
  return <ModuleCardContent {...props}>{children}</ModuleCardContent>
}
