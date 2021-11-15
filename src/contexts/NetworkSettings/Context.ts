import { EthAddress } from '@xylabs/sdk-js'
import React from 'react'

const Context = React.createContext<{
  xyStakingConsensusAddress?: EthAddress
  xyBondAddress?: EthAddress
  xyGovernanceAddress?: EthAddress
  xyFhrMerkleSendAddress?: EthAddress
}>({})
export default Context
