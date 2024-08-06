import { PayloadDiviner } from '@xyo-network/diviner-payload-abstract'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import React, { useEffect, useMemo, useState } from 'react'

import { PayloadDivinerContext } from './Context.js'

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

  const value = useMemo(() => ({ diviner: diviner === divinerProp ? diviner : undefined, provided: true, setDiviner }), [diviner, divinerProp, setDiviner])

  return (
    <PayloadDivinerContext.Provider
      value={value}
    >
      {diviner
        ? children
        : required
          ? null
          : children}
    </PayloadDivinerContext.Provider>
  )
}
