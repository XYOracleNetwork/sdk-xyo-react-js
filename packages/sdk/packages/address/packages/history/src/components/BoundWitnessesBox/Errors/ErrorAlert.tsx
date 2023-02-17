import { XyoErrorAlert } from '@xyo-network/react-error'

import { useHashSelectionHistory } from '../../../hooks'

export const BWErrorAlert: React.FC = () => {
  const { error } = useHashSelectionHistory()
  return error ? <XyoErrorAlert error={error} errorContext="HashSelectionContext Error" /> : null
}
