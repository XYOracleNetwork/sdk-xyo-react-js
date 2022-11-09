import { WithChildren } from '@xylabs/react-shared'
import { XyoStorageArchivistConfigSchema } from '@xyo-network/archivist'
import { ResultLoader, useDivineAddressHistory } from '@xyo-network/react-api'
import { StorageArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { XyoErrorRender } from '@xyo-network/react-error'
import { usePromise } from '@xyo-network/react-shared'
import { useParams } from 'react-router-dom'

export interface AddressHistoryArchivistProps extends WithChildren {
  required?: boolean
  defaultAddress?: string
}

const AddressHistoryArchivistInner: React.FC<AddressHistoryArchivistProps> = ({ children, defaultAddress, required = true }) => {
  const { address: addressFromParams } = useParams()
  const resolvedAddress = defaultAddress ?? addressFromParams
  const [addressHistory, error] = useDivineAddressHistory(resolvedAddress)
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

export const AddressHistoryArchivist: React.FC<AddressHistoryArchivistProps> = ({ children, ...props }) => {
  return (
    <StorageArchivistProvider config={{ namespace: 'AddressHistory', schema: XyoStorageArchivistConfigSchema, type: 'local' }}>
      <AddressHistoryArchivistInner {...props}>{children}</AddressHistoryArchivistInner>
    </StorageArchivistProvider>
  )
}
