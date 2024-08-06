import { CardProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { ModuleError } from '@xyo-network/payload-model'
import { ErrorAlert, ErrorRender } from '@xyo-network/react-error'
import React from 'react'

import { EmbedErrorCard } from './EmbedErrorCard.tsx'

interface EmbedCardApiErrorRendererProps extends CardProps {
  xyoError?: ModuleError
}

export const EmbedCardApiErrorRenderer: React.FC<WithChildren<EmbedCardApiErrorRendererProps>> = ({ xyoError, children, ...props }) => {
  return (
    <ErrorRender error={xyoError} noReAuth noErrorDisplay customError={<CustomApiErrorCard xyoError={xyoError} {...props} />}>
      {children}
    </ErrorRender>
  )
}

const CustomApiErrorCard: React.FC<EmbedCardApiErrorRendererProps> = ({ xyoError, ...props }) => {
  return (
    <EmbedErrorCard {...props}>
      <ErrorAlert error={xyoError} />
    </EmbedErrorCard>
  )
}
