import { Divider, List, ListProps, Skeleton, styled, useTheme } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { BoundWitnessRendererCard } from '@xyo-network/react-boundwitness-plugin'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, Fragment } from 'react'

import { useActiveBoundWitness } from '../../contexts'

const AddressChainList = styled(List, { name: 'AddressChainList' })(({ theme }) => ({
  overflow: 'scroll',
  padding: theme.spacing(3),
}))

export interface AddressChainProps extends ListProps {
  addressHistory?: XyoBoundWitness[]
  selectable?: boolean
  address?: string
  skeleton?: boolean
}

const AddressHistory = forwardRef<HTMLUListElement, AddressChainProps>(({ addressHistory, address, selectable, skeleton = true, ...props }, ref) => {
  const theme = useTheme()
  const { setActiveBoundWitnessHash, activeBoundWitnessHash } = useActiveBoundWitness(!!selectable)
  const sharedRef = useShareForwardedRef<HTMLUListElement>(ref)
  const [ulRef, dispatch] = useXyoEvent<HTMLUListElement>(undefined, sharedRef)

  const handleClick = (bw: XyoBoundWitness) => {
    setActiveBoundWitnessHash?.(new PayloadWrapper(bw).hash)
    dispatch('boundwitness', 'click', new PayloadWrapper(bw).hash)
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
    <AddressChainList ref={ulRef} {...props}>
      {addressHistory ? (
        addressHistory.map((bw, index) => (
          <Fragment key={index + (bw.timestamp?.toString() ?? address ?? '')}>
            <BoundWitnessRendererCard
              payload={bw}
              onClick={() => handleClick(bw)}
              sx={{ cursor: selectable ? 'pointer' : 'default' }}
              active={activeBoundWitnessHash ? new PayloadWrapper(bw).hash === activeBoundWitnessHash : false}
            />
            {validPreviousHash(index) ? <Divider flexItem orientation="vertical" sx={{ height: theme.spacing(4), my: 1, width: '50%' }} /> : null}
          </Fragment>
        ))
      ) : (
        <>{skeleton ? <Skeleton variant="rounded" width="100%" sx={{ p: 2 }} /> : null}</>
      )}
    </AddressChainList>
  )
})

AddressHistory.displayName = 'AddressHistory'

export { AddressHistory }
