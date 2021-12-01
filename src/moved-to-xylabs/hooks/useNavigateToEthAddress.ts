/* eslint-disable @delagen/deprecation/deprecation */
import { EthAddress } from '@xylabs/sdk-js'
import { NavigateOptions, To, useNavigate } from 'react-router-dom'

/** @deprecated Moved to @xylabs/sdk-react */
const useNavigateToEthAddress = () => {
  const navigate = useNavigate()
  const navigateToEthAddress = (
    address: EthAddress,
    event: React.MouseEvent,
    page?: string,
    to?: To,
    toOptions?: NavigateOptions,
    toEtherScan?: boolean
  ) => {
    const openInEtherScan = toEtherScan || (!to && !page)
    if (openInEtherScan) {
      window.open(`https://etherscan.io/address/${address.toString()}`, '_blank')
    } else {
      const path = to?.toString() ?? `/${page}/${address.toString()}`
      if (event.metaKey || toEtherScan) {
        window.open(path, '_blank')
      } else {
        navigate(to ?? path, toOptions)
      }
    }
  }
  return { navigateToEthAddress }
}

export default useNavigateToEthAddress
