import { CardHeaderProps } from '@mui/material'
import { ModuleCardHeader, ModuleRenderProps } from '@xyo-network/react-module'
import { SentinelInstance } from '@xyo-network/sentinel-model'

export const SentinelCardHeader: React.FC<ModuleRenderProps<SentinelInstance> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? module?.config.name ?? 'Sentinel'} {...props} />
}
