/* eslint-disable @delagen/deprecation/deprecation */
import { MouseEvent } from 'react'

import { useNavigateToEthAddress } from '../../hooks'
import EthAccountBase from './EthAccountBase'
import EthAccountProps from './EthAccountProps'

/** @deprecated Moved to @xylabs/sdk-react */
const EthAccountTo: React.FC<EthAccountProps> = ({
  address,
  to,
  page,
  toOptions,
  toEtherScan,
  onButtonClick,
  ...props
}) => {
  const { navigateToEthAddress } = useNavigateToEthAddress()
  if (address) {
    const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
      onButtonClick?.(event)
      if (to) {
        navigateToEthAddress(address, event, page, to, toOptions, toEtherScan)
      }
    }

    return <EthAccountBase onButtonClick={localOnClick} {...props} />
  }
  return null
}

export default EthAccountTo
