import { SchemaListApiDiviner } from '@xyo-network/api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { SchemaListApiDivinerContext } from './Context'

export type SchemaListApiDivinerProps = ContextExProviderProps<{
  diviner?: SchemaListApiDiviner
}>

export const SchemaListApiDivinerProvider: React.FC<SchemaListApiDivinerProps> = ({ diviner: divinerProp, required = false, children }) => {
  const [diviner, setDiviner] = useState<SchemaListApiDiviner | undefined>(divinerProp)

  useEffect(() => {
    if (divinerProp) {
      setDiviner(divinerProp)
    }
  }, [divinerProp, setDiviner])

  const resolveDiviner = () => {
    if (divinerProp) {
      return diviner === divinerProp ? diviner : undefined
    } else {
      return diviner
    }
  }

  return (
    <SchemaListApiDivinerContext.Provider
      value={{
        diviner: resolveDiviner(),
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </SchemaListApiDivinerContext.Provider>
  )
}
