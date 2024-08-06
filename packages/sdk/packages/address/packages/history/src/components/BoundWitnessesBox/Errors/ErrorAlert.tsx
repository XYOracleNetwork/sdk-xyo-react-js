import { ErrorAlert } from '@xyo-network/react-error'
import React from 'react'

import { usePayloadHashSelectionHistory } from '../../../hooks/index.js'

export const BWErrorAlert: React.FC = () => {
  const { error } = usePayloadHashSelectionHistory()
  return error ? <ErrorAlert error={error} errorContext="HashSelectionContext Error" /> : null
}
