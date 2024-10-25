import { useResetState } from '@xylabs/react-hooks'
import type { Context, PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import type { ContextExProviderProps } from '../contextEx/index.ts'
import type { ResolvedDivinerState } from './State.ts'

export interface DivinerProviderProps<D> extends ContextExProviderProps, PropsWithChildren {
  context: Context<ResolvedDivinerState<D>>
  diviner?: D
}

/** Exposes a resolved diviner */
export const ResolvedDivinerProvider = <D,>({
  diviner: divinerProp, required = false, children, context,
}: DivinerProviderProps<D>) => {
  const [diviner, setDiviner] = useResetState<D | undefined>(divinerProp)

  const value = useMemo(() => {
    const resolveDiviner = () => {
      if (divinerProp) {
        return diviner === divinerProp ? diviner : undefined
      } else {
        return diviner
      }
    }
    return {
      diviner: resolveDiviner(),
      provided: true,
      setDiviner,
    }
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
