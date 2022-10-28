import { WithChildren } from '@xylabs/react-shared'
import { Context, useEffect, useState } from 'react'

import { ContextExProviderProps } from '../contextEx'
import { ResolvedDivinerState } from './State'

export interface DivinerProviderProps<D> extends ContextExProviderProps, WithChildren {
  diviner?: D
  context: Context<ResolvedDivinerState<D>>
}

/** Exposes a resolved diviner */
export const ResolvedDivinerProvider = <D,>({ diviner: divinerProp, required = false, children, context }: DivinerProviderProps<D>) => {
  const [diviner, setDiviner] = useState<D | undefined>(divinerProp)

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
    <context.Provider
      value={{
        diviner: resolveDiviner(),
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </context.Provider>
  )
}
