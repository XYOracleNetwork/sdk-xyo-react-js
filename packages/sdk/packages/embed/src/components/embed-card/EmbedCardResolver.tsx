import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { LoadResult } from '@xyo-network/react-shared'

import { useRefreshPayload, useResolvePayload } from '../../contexts/index.js'
import { EmbedCardApiErrorRenderer } from './error-handling/index.js'

export const EmbedCardResolverFlexBox: React.FC<WithChildren<FlexBoxProps>> = ({ children, ...props }) => {
  const { payload, notFound, huriError } = useResolvePayload()
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
          busyCircularProps={{ style: { alignItems: 'start', paddingTop: theme.spacing(2), zIndex: 2 } }}
          {...props}
        >
          {children}
        </FlexCol>
      </EmbedCardApiErrorRenderer>
    </LoadResult>
  )
}
