import { CardActionsProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'
import { WitnessInstance } from '@xyo-network/witness-model'

export type WitnessCardActionsProps = ModuleRenderProps<WitnessInstance> &
  CardActionsProps & {
    onObserve?: (module?: WitnessInstance) => void
  }

export const WitnessCardActions: React.FC<WitnessCardActionsProps> = ({ onObserve, module, ...props }) => {
  return (
    <ModuleCardActions module={module} {...props}>
      <ButtonEx onClick={() => onObserve?.(module)} size={'small'} variant={'outlined'}>
        Observe
      </ButtonEx>
    </ModuleCardActions>
  )
}
