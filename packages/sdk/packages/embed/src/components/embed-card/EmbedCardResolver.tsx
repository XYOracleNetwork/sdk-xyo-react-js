import { useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import { LoadResult } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { useRefreshPayload, useResolvePayload } from '../../contexts/index.ts'
import { EmbedCardApiErrorRenderer } from './error-handling/index.ts'

export const EmbedCardResolverFlexBox: React.FC<PropsWithChildren<FlexBoxProps>> = ({ children, ...props }) => {
  const {
    payload, notFound, huriError,
  } = useResolvePayload()
  const { refreshPayload } = useRefreshPayload()
  const theme = useTheme()

  return (
    <LoadResult searchResult={payload} notFound={!!notFound} error={!!huriError}>
      <EmbedCardApiErrorRenderer xyoError={huriError}>
        <FlexCol
          id="embed-outer-wrap"
          alignItems="stretch"
          justifyContent="start"
          busy={Boolean(!refreshPayload && payload)}
          busyCircularProps={{
            style: {
              alignItems: 'start', paddingTop: theme.spacing(2), zIndex: 2,
            },
          }}
          {...props}
        >
          {children}
        </FlexCol>
      </EmbedCardApiErrorRenderer>
    </LoadResult>
  )
}
