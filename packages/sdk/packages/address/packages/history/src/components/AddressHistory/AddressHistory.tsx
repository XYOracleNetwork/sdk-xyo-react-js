import { Divider, List, ListProps, Skeleton, styled, useTheme } from '@mui/material'
import { Address, Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessRendererCard } from '@xyo-network/react-boundwitness-plugin'
import { useEvent } from '@xyo-network/react-event'
import { usePayloadHashes, useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, Fragment } from 'react'

import { orderedHistory, useActiveBoundWitness } from '../../hooks/index.js'

const AddressChainList = styled(List, { name: 'AddressChainList' })(() => ({
  overflow: 'scroll',
  padding: 0,
}))

export interface AddressChainProps extends ListProps {
  address?: Address
  addressHistory?: BoundWitness[]
  selectable?: boolean
  skeleton?: boolean
}

const AddressHistory = forwardRef<HTMLUListElement, AddressChainProps>(({ address, addressHistory, selectable, skeleton = true, ...props }, ref) => {
  const theme = useTheme()
  const { setActiveBoundWitnessHash, activeBoundWitnessHash } = useActiveBoundWitness(!!selectable)
  const sharedRef = useShareForwardedRef<HTMLUListElement>(ref)
  const [ulRef, dispatch] = useEvent<HTMLUListElement>(undefined, sharedRef)
  const [orderedAddressHistory] = usePromise(() => orderedHistory(addressHistory), [addressHistory])

  const orderedAddressHistoryPairs = usePayloadHashes(orderedAddressHistory)

  const handleClick = (hash: Hash) => {
    setActiveBoundWitnessHash?.(hash)
    dispatch('boundwitness', 'click', hash)
  }

  return (
    <AddressChainList ref={ulRef} {...props}>
      {orderedAddressHistoryPairs
        ? orderedAddressHistoryPairs.map(([bw, bwHash], index) => (
          <Fragment key={index + (bw.timestamp?.toString() ?? address ?? '')}>
            {index === 0 ? null : <Divider flexItem orientation="vertical" sx={{ height: theme.spacing(4), my: 1, width: '50%' }} />}
            <BoundWitnessRendererCard
              payload={bw}
              onClick={() => handleClick(bwHash)}
              sx={{ cursor: selectable ? 'pointer' : 'default' }}
              active={activeBoundWitnessHash ? bwHash === activeBoundWitnessHash : false}
            />
          </Fragment>
        ))
        : (
            <>
              {skeleton
                ? <Skeleton variant="rounded" width="100%" sx={{ p: 2 }} />
                : null}
            </>
          )}
    </AddressChainList>
  )
})

AddressHistory.displayName = 'AddressHistory'
export { AddressHistory }
