import { CardContentProps } from '@mui/material'
import { DivinerModule } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardContent } from '../Module'

export const DivinerCardContent: React.FC<ModuleRenderProps<DivinerModule> & CardContentProps> = ({ children, ...props }) => {
  return <ModuleCardContent {...props}>{children}</ModuleCardContent>
}
