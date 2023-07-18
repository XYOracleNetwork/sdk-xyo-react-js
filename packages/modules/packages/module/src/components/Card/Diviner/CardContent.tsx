import { CardContentProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardContent } from '../Module'

export const DivinerCardContent: React.FC<ModuleRenderProps<DivinerInstance> & CardContentProps> = ({ children, ...props }) => {
  return <ModuleCardContent {...props}>{children}</ModuleCardContent>
}
