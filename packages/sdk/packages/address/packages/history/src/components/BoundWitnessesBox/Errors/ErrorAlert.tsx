import { XyoErrorAlert } from '@xyo-network/react-error'

import { usePayloadHashSelectionHistory } from '../../../hooks'

export const BWErrorAlert: React.FC = () => {
  const { error } = usePayloadHashSelectionHistory()
  return error ? <XyoErrorAlert error={error} errorContext="HashSelectionContext Error" /> : null
}
