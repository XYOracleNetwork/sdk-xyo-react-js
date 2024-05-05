import { CardHeaderProps } from '@mui/material'
import { ModuleCardHeader, ModuleRenderProps } from '@xyo-network/react-module'
import { SentinelInstance } from '@xyo-network/sentinel-model'

export const SentinelCardHeader: React.FC<ModuleRenderProps<SentinelInstance> & CardHeaderProps> = ({ title, mod, ...props }) => {
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Sentinel'} {...props} />
}
