import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { ResultLoader } from '@xyo-network/react-webapp'

import { useRefreshPayload, useResolvePayload } from '../../contexts'

export const EmbedCardResolverFlexBox: React.FC<WithChildren<FlexBoxProps>> = ({ children, ...props }) => {
  const { payload, notFound, huriApiError } = useResolvePayload()
  const { refreshPayload } = useRefreshPayload()
  const theme = useTheme()

  return (
    <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriApiError}>
      <XyoApiErrorRender apiError={huriApiError}>
        <FlexGrowCol
          alignItems="stretch"
          busy={Boolean(!refreshPayload && payload)}
          busyCircularProps={{ style: { alignItems: 'start', paddingTop: theme.spacing(2), zIndex: 2 } }}
          {...props}
        >
          {children}
        </FlexGrowCol>
      </XyoApiErrorRender>
    </ResultLoader>
  )
}
