import { assertEx, EthAddress } from '@xyo-network/sdk-xyo-js'
import { useNavigate } from 'react-router-dom'

const useNavigateToEthAddress = () => {
  const navigate = useNavigate()
  const navigateToEthAddress = (
    address: EthAddress,
    event: React.MouseEvent,
    page?: string,
    to?: string,
    toEtherScan?: boolean
  ) => {
    if (toEtherScan) {
      window.open(`https://etherscan.io/address/${address.toString()}`, '_blank')
    } else {
      assertEx(to || page, 'to or page has to be specified')
      const path = to ?? `/${page}/${address.toString()}`
      if (event.metaKey || toEtherScan) {
        window.open(path, '_blank')
      } else {
        navigate(path)
      }
    }
  }
  return { navigateToEthAddress }
}

export default useNavigateToEthAddress
