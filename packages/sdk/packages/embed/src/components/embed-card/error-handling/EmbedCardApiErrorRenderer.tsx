import { CardProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { XyoError } from '@xyo-network/module'
import { XyoErrorAlert, XyoErrorRender } from '@xyo-network/react-error'

import { EmbedErrorCard } from './EmbedErrorCard'

interface EmbedCardApiErrorRendererProps extends CardProps {
  xyoError?: XyoError
}

export const EmbedCardApiErrorRenderer: React.FC<WithChildren<EmbedCardApiErrorRendererProps>> = ({ xyoError, children, ...props }) => {
  return (
    <XyoErrorRender xyoError={xyoError} noReAuth noErrorDisplay customError={<CustomApiErrorCard xyoError={xyoError} {...props} />}>
      {children}
    </XyoErrorRender>
  )
}

const CustomApiErrorCard: React.FC<EmbedCardApiErrorRendererProps> = ({ xyoError, ...props }) => {
  return (
    <EmbedErrorCard {...props}>
      <XyoErrorAlert error={xyoError} />
    </EmbedErrorCard>
  )
}
