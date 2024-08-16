import type { WithChildren } from '@xylabs/react-shared'
import type { Context } from 'react'
import React, { useEffect, useMemo, useState } from 'react'

import type { ContextExProviderProps } from '../contextEx/index.ts'
import type { ResolvedDivinerState } from './State.ts'

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
