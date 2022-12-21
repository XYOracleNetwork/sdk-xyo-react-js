/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { SchemaStatsApiDiviner } from '@xyo-network/api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { SchemaStatsApiDivinerContext } from './Context'

/** @deprecated - get stats from querying the module on the node directly */
export type SchemaStatsApiDivinerProps = ContextExProviderProps<{
  diviner?: SchemaStatsApiDiviner
}>

export const SchemaStatsApiDivinerProvider: React.FC<SchemaStatsApiDivinerProps> = ({ diviner: divinerProp, required = false, children }) => {
  const [diviner, setDiviner] = useState<SchemaStatsApiDiviner | undefined>(divinerProp)

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
    <SchemaStatsApiDivinerContext.Provider
      value={{
        diviner: resolveDiviner(),
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </SchemaStatsApiDivinerContext.Provider>
  )
}
