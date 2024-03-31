import { CardActionsProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'
import { SentinelInstance } from '@xyo-network/sentinel-model'

export type SentinelCardActionsProps = ModuleRenderProps<SentinelInstance> &
  CardActionsProps & {
    onReport?: (module?: SentinelInstance) => void
  }

export const SentinelCardActions: React.FC<SentinelCardActionsProps> = ({ onReport, module, ...props }) => {
  return (
    <ModuleCardActions module={module} {...props}>
      <ButtonEx onClick={() => onReport?.(module)} size={'small'} variant={'outlined'}>
        Report
      </ButtonEx>
    </ModuleCardActions>
  )
}
