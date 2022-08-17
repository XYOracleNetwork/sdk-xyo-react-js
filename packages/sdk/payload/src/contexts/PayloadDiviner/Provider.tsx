import { XyoAccount } from '@xyo-network/account'
import { XyoHuriPayloadDiviner, XyoPayloadDiviner } from '@xyo-network/diviner'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useMemo, useState } from 'react'

import { PayloadDivinerContext } from './Context'

export type PayloadDivinerProviderProps = ContextExProviderProps<{
  diviner?: XyoPayloadDiviner
}>

export const PayloadDivinerProvider: React.FC<PayloadDivinerProviderProps> = ({ diviner: divinerProp, required = false, children }) => {
  const [diviner, setDiviner] = useState<XyoPayloadDiviner | undefined>(divinerProp)
  const { api } = useArchivistApi()

  const activeDiviner = useMemo(() => {
    //if no diviner is set, then we use a XyoHuriPayloadDiviner
    return (
      diviner ??
      new XyoHuriPayloadDiviner({
        account: new XyoAccount(),
        options: { archivistUri: api?.config.apiDomain },
        schema: 'network.xyo.diviner.payload.huri.config',
      })
    )
  }, [diviner, api?.config.apiDomain])

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
