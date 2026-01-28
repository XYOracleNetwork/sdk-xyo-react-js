import type { ListProps } from '@mui/material'
import {
  Divider, List, Skeleton, styled, useTheme,
} from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import type { Hash } from '@xylabs/sdk-js'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessRendererCard } from '@xyo-network/react-boundwitness-plugin'
import { useEvent } from '@xyo-network/react-event'
import { usePayloadHashes, useShareForwardedRef } from '@xyo-network/react-shared'
import React, { Fragment } from 'react'

import { orderedHistory, useActiveBoundWitness } from '../../hooks/index.ts'

const AddressChainList = styled(List, { name: 'AddressChainList' })(() => ({
  overflow: 'scroll',
  padding: 0,
}))

export interface AddressHistoryProps extends ListProps {
  addressHistory?: BoundWitness[]
  selectable?: boolean
  skeleton?: boolean
}

const AddressHistory = ({
  ref, addressHistory, selectable, skeleton = true, ...props
}: AddressHistoryProps & { ref?: React.RefObject<HTMLUListElement | null> }) => {
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
            <Fragment key={bw._sequence}>
              {index === 0
                ? null
                : (
                    <Divider
                      flexItem
                      orientation="vertical"
                      sx={{
                        height: theme.spacing(4), my: 1, width: '50%',
                      }}
                    />
                  )}
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
}

AddressHistory.displayName = 'AddressHistory'
export { AddressHistory }
