import { WithChildren } from '@xylabs/react-shared'
import { XyoStorageArchivistConfigSchema } from '@xyo-network/archivist'
import { ResultLoader, useDivineAddressHistory } from '@xyo-network/react-api'
import { StorageArchivistProvider, useArchivistInsert } from '@xyo-network/react-archivist'
import { XyoErrorRender } from '@xyo-network/react-error'
import { useParams } from 'react-router-dom'

const AddressHistoryArchivistInner: React.FC<WithChildren> = ({ children }) => {
  const { address } = useParams()
  const [addressHistory, error] = useDivineAddressHistory(address)

  useArchivistInsert(addressHistory ?? [])

  return (
    <XyoErrorRender xyoError={error}>
      <ResultLoader notFound={addressHistory === null} searchResult={addressHistory} apiError={error}>
        {children}
      </ResultLoader>
    </XyoErrorRender>
  )
}

export const AddressHistoryArchivist: React.FC<WithChildren> = ({ children }) => {
  return (
    <StorageArchivistProvider config={{ namespace: 'AddressHistory', schema: XyoStorageArchivistConfigSchema, type: 'local' }}>
      <AddressHistoryArchivistInner>{children}</AddressHistoryArchivistInner>
    </StorageArchivistProvider>
  )
}
