import { Address } from '@xylabs/hex'
import type { WithChildren } from '@xylabs/react-shared'
import { ErrorRender } from '@xyo-network/react-error'
import { LoadResult } from '@xyo-network/react-shared'
import React from 'react'

import { useAddressHistory } from '../../hooks/index.ts'

export interface AddressHistoryArchivistProps extends WithChildren {
  address?: Address
  required?: boolean
}

/** @deprecated - rely on outside storage archivist */
export const AddressHistoryArchivist: React.FC<AddressHistoryArchivistProps> = ({ address, children }) => {
  const [addressHistory, error] = useAddressHistory(address)

  return (
    <ErrorRender error={error}>
      <LoadResult notFound={addressHistory === null} searchResult={addressHistory} apiError={error}>
        {children}
      </LoadResult>
    </ErrorRender>
  )
}
