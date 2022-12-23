import { WithChildren } from '@xylabs/react-shared'
import { StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { StorageArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { XyoErrorRender } from '@xyo-network/react-error'
import { LoadResult, usePromise } from '@xyo-network/react-shared'
import { useParams } from 'react-router-dom'

import { useAddressHistory } from '../../hooks'

export interface AddressHistoryArchivistProps extends WithChildren {
  required?: boolean
  address?: string
}

const AddressHistoryArchivistInner: React.FC<AddressHistoryArchivistProps> = ({ children, address, required = true }) => {
  const [addressHistory, error] = useAddressHistory(address)
  const { archivist } = useArchivist(required)

  const [, insertError] = usePromise(addressHistory ? archivist?.insert(addressHistory) : Promise.resolve(undefined), [archivist])
  console.log(addressHistory)
  return (
    <XyoErrorRender xyoError={error ?? insertError}>
      <LoadResult notFound={addressHistory === null} searchResult={addressHistory} apiError={error || insertError}>
        {children}
      </LoadResult>
    </XyoErrorRender>
  )
}

export const AddressHistoryArchivist: React.FC<AddressHistoryArchivistProps> = ({ children, address, ...props }) => {
  const { address: addressFromParams } = useParams()
  const resolvedAddress = address ?? addressFromParams
  const namespace = `AddressHistory.${resolvedAddress}`

  return (
    <StorageArchivistProvider config={{ namespace, schema: StorageArchivistConfigSchema, type: 'local' }}>
      <AddressHistoryArchivistInner address={resolvedAddress} {...props}>
        {children}
      </AddressHistoryArchivistInner>
    </StorageArchivistProvider>
  )
}
