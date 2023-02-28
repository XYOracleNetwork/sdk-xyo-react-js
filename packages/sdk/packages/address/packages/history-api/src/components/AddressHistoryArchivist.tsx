/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { WithChildren } from '@xylabs/react-shared'
import { StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { ResultLoader, useDivineAddressHistory } from '@xyo-network/react-api'
import { StorageArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { XyoErrorRender } from '@xyo-network/react-error'
import { usePromise } from '@xyo-network/react-shared'
import { useParams } from 'react-router-dom'

/** @deprecated - moved to @xyo-network/react-address-history */
export interface AddressHistoryArchivistProps extends WithChildren {
  address?: string
  required?: boolean
}

const AddressHistoryArchivistInner: React.FC<AddressHistoryArchivistProps> = ({ address, children }) => {
  const [addressHistory, error] = useDivineAddressHistory(address)
  const archivist = useArchivist()

  const [, insertError] = usePromise(addressHistory ? archivist?.insert(addressHistory) : Promise.resolve(undefined), [archivist])

  return (
    <XyoErrorRender xyoError={error ?? insertError}>
      <ResultLoader notFound={addressHistory === null} searchResult={addressHistory} apiError={error}>
        {children}
      </ResultLoader>
    </XyoErrorRender>
  )
}

/** @deprecated - moved to @xyo-network/react-address-history */
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
