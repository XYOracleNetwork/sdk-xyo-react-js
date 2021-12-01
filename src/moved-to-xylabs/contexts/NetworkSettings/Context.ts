/* eslint-disable @delagen/deprecation/deprecation */
import { EthAddress } from '@xylabs/sdk-js'
import React from 'react'

/** @deprecated Moved to @xylabs/sdk-react */
const Context = React.createContext<{
  xyStakingConsensusAddress?: EthAddress
  xyBondAddress?: EthAddress
  xyGovernanceAddress?: EthAddress
  xyFhrMerkleSendAddress?: EthAddress
}>({})
export default Context
