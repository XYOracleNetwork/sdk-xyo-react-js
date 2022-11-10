import { Divider, List, ListProps, Skeleton, styled, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { BoundWitnessRendererCard } from '@xyo-network/react-boundwitness-plugin'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import compact from 'lodash/compact'
import { forwardRef, Fragment, useEffect, useState } from 'react'

import { useActiveBoundWitness } from '../../contexts'
import { useOrderedHistory } from '../../hooks'

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
  const [orderedAddressHistory, setOrderedAddressHistory] = useState<(XyoBoundWitness | undefined)[]>()
  const orderHistoryFn = useOrderedHistory()

  const handleClick = (bw: XyoBoundWitness) => {
    setActiveBoundWitnessHash?.(new PayloadWrapper(bw).hash)
    dispatch('boundwitness', 'click', new PayloadWrapper(bw).hash)
  }

  useEffect(() => {
    if (addressHistory?.length) {
      setOrderedAddressHistory(orderHistoryFn(addressHistory))
    }
  }, [addressHistory, orderHistoryFn])

  const validPreviousHash = (index: number) => {
    // ensure valid address chain and not initial item in the chain
    if (!addressHistory || addressHistory.length === 0 || index === addressHistory?.length) {
      return false
    }

    const currentHash = new PayloadWrapper(addressHistory[index]).hash
    return addressHistory.some((bw) => bw.previous_hashes.some((hash) => hash === currentHash))
  }

  return (
    <AddressChainList ref={ulRef} {...props}>
      {orderedAddressHistory ? (
        compact(orderedAddressHistory).map((bw, index) => (
          <Fragment key={index + (bw.timestamp?.toString() ?? address ?? '')}>
            {index !== 0 ? (
              <>
                {validPreviousHash(index) ? (
                  <Divider flexItem orientation="vertical" sx={{ height: theme.spacing(4), my: 1, width: '50%' }} />
                ) : (
                  <FlexCol minHeight={theme.spacing(4)} />
                )}
              </>
            ) : null}
            <BoundWitnessRendererCard
              payload={bw}
              onClick={() => handleClick(bw)}
              sx={{ cursor: selectable ? 'pointer' : 'default' }}
              active={activeBoundWitnessHash ? new PayloadWrapper(bw).hash === activeBoundWitnessHash : false}
            />
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
