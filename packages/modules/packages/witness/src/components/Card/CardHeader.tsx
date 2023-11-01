import { CardHeaderProps } from '@mui/material'
import { ModuleCardHeader, ModuleRenderProps } from '@xyo-network/react-module'
import { WitnessInstance } from '@xyo-network/witness-model'

export const WitnessCardHeader: React.FC<ModuleRenderProps<WitnessInstance> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? module?.config.name ?? 'Witness'} {...props} />
}
