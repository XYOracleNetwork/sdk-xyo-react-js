import { WithChildren } from '@xylabs/react-shared'
import { XyoStorageArchivistConfigSchema } from '@xyo-network/archivist'
import { ResultLoader, useDivineAddressHistory } from '@xyo-network/react-api'
import { StorageArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { XyoErrorRender } from '@xyo-network/react-error'
import { usePromise } from '@xyo-network/react-shared'
import { useParams } from 'react-router-dom'

export interface AddressHistoryArchivistProps extends WithChildren {
  required?: boolean
  address?: string
}

const AddressHistoryArchivistInner: React.FC<AddressHistoryArchivistProps> = ({ children, address, required = true }) => {
  const [addressHistory, error] = useDivineAddressHistory(address)
  const { archivist } = useArchivist(required)

  const [, insertError] = usePromise(addressHistory ? archivist?.insert(addressHistory) : Promise.resolve(undefined), [archivist])

  return (
    <XyoErrorRender xyoError={error ?? insertError}>
      <ResultLoader notFound={addressHistory === null} searchResult={addressHistory} apiError={error}>
        {children}
      </ResultLoader>
    </XyoErrorRender>
  )
}

export const AddressHistoryArchivist: React.FC<AddressHistoryArchivistProps> = ({ children, address, ...props }) => {
  const { address: addressFromParams } = useParams()
  const resolvedAddress = address ?? addressFromParams
  const namespace = `AddressHistory.${resolvedAddress}`

  return (
    <StorageArchivistProvider config={{ namespace, schema: XyoStorageArchivistConfigSchema, type: 'local' }}>
      <AddressHistoryArchivistInner address={resolvedAddress} {...props}>
        {children}
      </AddressHistoryArchivistInner>
    </StorageArchivistProvider>
  )
}
