import { PayloadDiviner } from '@xyo-network/diviner-payload-abstract'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { PayloadDivinerContext } from './Context'

export type PayloadDivinerProviderProps = ContextExProviderProps<{
  /** Required */
  diviner?: PayloadDiviner
}>

export const PayloadDivinerProvider: React.FC<PayloadDivinerProviderProps> = ({ diviner: divinerProp, required = false, children }) => {
  const [diviner, setDiviner] = useState<PayloadDiviner | undefined>(divinerProp)

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
