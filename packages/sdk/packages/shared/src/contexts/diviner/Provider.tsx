import { WithChildren } from '@xylabs/react-shared'
import React, { Context, useEffect, useMemo, useState } from 'react'

import { ContextExProviderProps } from '../contextEx/index.js'
import { ResolvedDivinerState } from './State.js'

export interface DivinerProviderProps<D> extends ContextExProviderProps, WithChildren {
  context: Context<ResolvedDivinerState<D>>
  diviner?: D
}

/** Exposes a resolved diviner */
export const ResolvedDivinerProvider = <D,>({ diviner: divinerProp, required = false, children, context }: DivinerProviderProps<D>) => {
  const [diviner, setDiviner] = useState<D | undefined>(divinerProp)

  useEffect(() => {
    if (divinerProp) {
      setDiviner(divinerProp)
    }
  }, [divinerProp, setDiviner])

  const value = useMemo(() => {
    const resolveDiviner = () => {
      if (divinerProp) {
        return diviner === divinerProp ? diviner : undefined
      } else {
        return diviner
      }
    }
    return { diviner: resolveDiviner(),
      provided: true,
      setDiviner }
  }, [
    setDiviner, divinerProp])

  return (
    <context.Provider
      value={value}
    >
      {diviner
        ? children
        : required
          ? null
          : children}
    </context.Provider>
  )
}
