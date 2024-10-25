import { ErrorAlert } from '@xylabs/react-error'
import React from 'react'

import { usePayloadHashSelectionHistory } from '../../../hooks/index.ts'

export const BWErrorAlert: React.FC = () => {
  const { error } = usePayloadHashSelectionHistory()
  return error ? <ErrorAlert error={error} scope="HashSelectionContext Error" /> : null
}
