import { EthAddress } from '@xyo-network/sdk-xyo-js'
import React from 'react'

const Context = React.createContext<{
  xyStakingConsensusAddress?: EthAddress
  xyBondAddress?: EthAddress
  xyGovernanceAddress?: EthAddress
}>({})
export default Context
