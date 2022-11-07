import { Divider, List, ListProps, Skeleton, styled, useTheme } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { BoundWitnessRendererCard } from '@xyo-network/react-boundwitness-plugin'
import { Fragment } from 'react'

import { useActiveBoundWitness } from '../../contexts'

export interface AddressChainProps extends ListProps {
  addressHistory?: XyoBoundWitness[]
  selectable?: boolean
  address?: string
  skeleton?: boolean
}

export const AddressHistory: React.FC<AddressChainProps> = ({ addressHistory, address, selectable, skeleton = true, ...props }) => {
  const theme = useTheme()
  const { setActiveBoundWitness, activeBoundWitness } = useActiveBoundWitness(!!selectable)

  const handleClick = (bw: XyoBoundWitness) => {
    setActiveBoundWitness?.(bw)
  }

  const validPreviousHash = (index: number) => {
    // ensure valid address chain and not initial item in the chain
    if (!addressHistory || addressHistory.length === 0 || index === addressHistory?.length) {
      return false
    }

    // + 1 because the order of the addressHistory is newest to oldest
    const previousCalculatedHash = new PayloadWrapper(addressHistory[index + 1]).hash
    return addressHistory[index].previous_hashes.some((hash) => hash === previousCalculatedHash)
  }

  return (
    <AddressChainList {...props}>
      {addressHistory ? (
        addressHistory.map((bw, index) => (
          <Fragment key={index + (bw.timestamp?.toString() ?? address ?? '')}>
            <BoundWitnessRendererCard
              payload={bw}
              onClick={() => handleClick(bw)}
              sx={{ cursor: selectable ? 'pointer' : 'default' }}
              active={bw === activeBoundWitness}
            />
            {validPreviousHash(index) ? <Divider flexItem orientation="vertical" sx={{ height: theme.spacing(4), my: 1, width: '50%' }} /> : null}
          </Fragment>
        ))
      ) : (
        <>{skeleton ? <Skeleton variant="rounded" width="100%" sx={{ p: 2 }} /> : null}</>
      )}
    </AddressChainList>
  )
}

const AddressChainList = styled(List, { name: 'AddressChainList' })(({ theme }) => ({
  overflow: 'scroll',
  padding: theme.spacing(3),
}))
