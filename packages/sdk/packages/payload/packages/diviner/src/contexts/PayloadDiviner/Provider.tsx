import { useResetState } from '@xylabs/react-hooks'
import type { ContextExProviderProps } from '@xylabs/react-shared'
import type { PayloadDiviner } from '@xyo-network/diviner-payload-abstract'
import React, { useMemo } from 'react'

import { PayloadDivinerContext } from './Context.ts'
import type { PayloadDivinerState } from './State.ts'

export type PayloadDivinerProviderProps = ContextExProviderProps<{
  /** Required */
  diviner?: PayloadDiviner
}>

export const PayloadDivinerProvider: React.FC<PayloadDivinerProviderProps> = ({
  diviner: divinerProp, required = false, children,
}) => {
  const [diviner, setDiviner] = useResetState<PayloadDiviner | undefined>(divinerProp)

  const value: PayloadDivinerState = useMemo(() => ({
    diviner: diviner === divinerProp ? diviner : undefined, provided: true, setDiviner,
  }), [diviner, divinerProp, setDiviner])

  return (
    <PayloadDivinerContext
      value={value}
    >
      {diviner
        ? children
        : required
          ? null
          : children}
    </PayloadDivinerContext>
  )
}
