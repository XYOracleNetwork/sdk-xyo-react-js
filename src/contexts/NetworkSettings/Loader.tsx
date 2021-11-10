import { EthAddress } from '@xyo-network/sdk-xyo-js'
import React from 'react'

import NetworkSettingsContext from './Context'

interface Props {
  enabled?: boolean
}

export const NetworkSettingsLoader: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <NetworkSettingsContext.Provider
      value={{
        xyBondAddress: EthAddress.fromString('0x1a024A698EEBdB86ccf3fCaF2F589839bdc066AD'),
        xyFhrMerkleSend: EthAddress.fromString('0x46FEEBDffC8076D9E5fd8a11CF1508810472A79f'),
        xyGovernanceAddress: EthAddress.fromString('0x01925d0fFE4a6a6162B51ba611e3D4780Fc2dF42'),
        xyStakingConsensusAddress: EthAddress.fromString('0x0242514106114DEaA99Fd81574142c36Edb03B6D'),
      }}
    >
      {children}
    </NetworkSettingsContext.Provider>
  )
}
