import { XyoAccount } from '@xyo-network/account'
import { XyoHuriPayloadDiviner, XyoPayloadDiviner } from '@xyo-network/diviner'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useMemo, useState } from 'react'

import { PayloadDivinerContext } from './Context'

export type PayloadDivinerProviderProps = ContextExProviderProps<{
  diviner?: XyoPayloadDiviner
  noDefaultDiviner?: boolean
}>

export const PayloadDivinerProvider: React.FC<PayloadDivinerProviderProps> = ({
  diviner: divinerProp,
  noDefaultDiviner = false,
  required = false,
  children,
}) => {
  const [diviner, setDiviner] = useState<XyoPayloadDiviner | undefined>(divinerProp)
  const { api } = useArchivistApi()

  useEffect(() => {
    if (divinerProp) {
      setDiviner(divinerProp)
    }
  }, [divinerProp])

  const activeDiviner = useMemo(() => {
    //if no diviner is set, then we use a XyoHuriPayloadDiviner
    return !noDefaultDiviner && !diviner
      ? new XyoHuriPayloadDiviner({
          account: new XyoAccount(),
          options: { archivistUri: api?.config.apiDomain },
          schema: 'network.xyo.diviner.payload.huri.config',
          targetSchema: 'network.xyo.diviner.payload',
        })
      : undefined
  }, [noDefaultDiviner, diviner, api?.config.apiDomain])

  return (
    <PayloadDivinerContext.Provider
      value={{
        diviner: activeDiviner,
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </PayloadDivinerContext.Provider>
  )
}
