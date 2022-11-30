import { AbstractPayloadDiviner } from '@xyo-network/diviner'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { PayloadDivinerContext } from './Context'

export type PayloadDivinerProviderProps = ContextExProviderProps<{
  /** Required */
  diviner?: AbstractPayloadDiviner
}>

export const PayloadDivinerProvider: React.FC<PayloadDivinerProviderProps> = ({ diviner: divinerProp, required = false, children }) => {
  const [diviner, setDiviner] = useState<AbstractPayloadDiviner | undefined>(divinerProp)

  useEffect(() => {
    if (divinerProp) {
      setDiviner(divinerProp)
    }
  }, [divinerProp])

  return (
    <PayloadDivinerContext.Provider
      value={{
        diviner: diviner === divinerProp ? diviner : undefined,
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </PayloadDivinerContext.Provider>
  )
}
