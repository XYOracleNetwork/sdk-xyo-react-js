import { ErrorAlert } from '@xyo-network/react-error'

import { usePayloadHashSelectionHistory } from '../../../hooks'

export const BWErrorAlert: React.FC = () => {
  const { error } = usePayloadHashSelectionHistory()
  return error ? <ErrorAlert error={error} errorContext="HashSelectionContext Error" /> : null
}
