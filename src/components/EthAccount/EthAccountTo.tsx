import { MouseEvent } from 'react'

import { useNavigateToEthAddress } from '../../hooks'
import EthAccountBase from './EthAccountBase'
import EthAccountProps from './EthAccountProps'

const EthAccountTo: React.FC<EthAccountProps> = ({ address, to, page, toOptions, toEtherScan, onClick, ...props }) => {
  const { navigateToEthAddress } = useNavigateToEthAddress()
  if (address) {
    const localOnClick = (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event)
      if (to) {
        navigateToEthAddress(address, event, page, to, toOptions, toEtherScan)
      }
    }

    return <EthAccountBase onClick={localOnClick} {...props} />
  }
  return null
}

export default EthAccountTo
