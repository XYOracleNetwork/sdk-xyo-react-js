import { XyoRemoteAddressHistoryDiviner } from '@xyo-network/api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { AddressHistoryDivinerContext } from './Context'

export type AddressHistoryDivinerProviderProps = ContextExProviderProps<{
  /** Required */
  diviner?: XyoRemoteAddressHistoryDiviner
}>

export const AddressHistoryDivinerProvider: React.FC<AddressHistoryDivinerProviderProps> = ({ diviner: divinerProp, required = false, children }) => {
  const [diviner, setDiviner] = useState<XyoRemoteAddressHistoryDiviner | undefined>(divinerProp)

  useEffect(() => {
    if (divinerProp) {
      setDiviner(divinerProp)
    }
  }, [divinerProp, setDiviner])

  return (
    <AddressHistoryDivinerContext.Provider
      value={{
        diviner: diviner === divinerProp ? diviner : undefined,
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </AddressHistoryDivinerContext.Provider>
  )
}
