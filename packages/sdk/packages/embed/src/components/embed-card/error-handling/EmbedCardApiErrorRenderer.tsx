import { CardProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { ApiErrorAlert } from '@xyo-network/react-api'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'

import { EmbedErrorCard } from './EmbedErrorCard'

interface EmbedCardApiErrorRendererProps extends CardProps {
  apiError?: XyoApiError
}

export const EmbedCardApiErrorRenderer: React.FC<WithChildren<EmbedCardApiErrorRendererProps>> = ({ apiError, children, ...props }) => {
  return (
    <XyoApiErrorRender apiError={apiError} noReAuth noErrorDisplay customError={<CustomApiErrorCard apiError={apiError} {...props} />}>
      {children}
    </XyoApiErrorRender>
  )
}

const CustomApiErrorCard: React.FC<EmbedCardApiErrorRendererProps> = ({ apiError, ...props }) => {
  return (
    <EmbedErrorCard {...props}>
      <ApiErrorAlert call={apiError} />
    </EmbedErrorCard>
  )
}
