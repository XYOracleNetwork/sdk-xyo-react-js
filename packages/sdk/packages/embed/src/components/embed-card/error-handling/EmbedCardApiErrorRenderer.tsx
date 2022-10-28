import { CardProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { XyoError } from '@xyo-network/module'
import { ApiErrorAlert } from '@xyo-network/react-api'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'

import { EmbedErrorCard } from './EmbedErrorCard'

interface EmbedCardApiErrorRendererProps extends CardProps {
  xyoError?: XyoError
}

export const EmbedCardApiErrorRenderer: React.FC<WithChildren<EmbedCardApiErrorRendererProps>> = ({ xyoError, children, ...props }) => {
  return (
    <XyoApiErrorRender apiError={xyoError} noReAuth noErrorDisplay customError={<CustomApiErrorCard xyoError={xyoError} {...props} />}>
      {children}
    </XyoApiErrorRender>
  )
}

const CustomApiErrorCard: React.FC<EmbedCardApiErrorRendererProps> = ({ xyoError, ...props }) => {
  return (
    <EmbedErrorCard {...props}>
      <ApiErrorAlert call={xyoError} />
    </EmbedErrorCard>
  )
}
