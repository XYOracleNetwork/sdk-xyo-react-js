import type { CardProps } from '@mui/material'
import { ErrorAlert, ErrorRender } from '@xylabs/react-error'
import type { ModuleError } from '@xyo-network/payload-model'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { EmbedErrorCard } from './EmbedErrorCard.tsx'

interface EmbedCardApiErrorRendererProps extends CardProps {
  xyoError?: ModuleError
}

export const EmbedCardApiErrorRenderer: React.FC<PropsWithChildren<EmbedCardApiErrorRendererProps>> = ({
  xyoError, children, ...props
}) => {
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
