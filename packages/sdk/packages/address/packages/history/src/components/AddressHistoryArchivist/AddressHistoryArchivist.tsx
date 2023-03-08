import { WithChildren } from '@xylabs/react-shared'
import { XyoErrorRender } from '@xyo-network/react-error'
import { LoadResult } from '@xyo-network/react-shared'

import { useAddressHistory } from '../../hooks'

export interface AddressHistoryArchivistProps extends WithChildren {
  address?: string
  required?: boolean
}

export const AddressHistoryArchivist: React.FC<AddressHistoryArchivistProps> = ({ address, children }) => {
  const [addressHistory, error] = useAddressHistory(address)

  return (
    <XyoErrorRender error={error}>
      <LoadResult notFound={addressHistory === null} searchResult={addressHistory} apiError={error}>
        {children}
      </LoadResult>
    </XyoErrorRender>
  )
}
