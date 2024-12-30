import type { ThrownErrorBoundaryProps } from '@xylabs/react-error'
import { ThrownErrorBoundary as ThrownErrorBoundaryBase } from '@xylabs/react-error'
import type { ModuleError } from '@xyo-network/payload-model'
import type { FC } from 'react'
import React from 'react'

export const ThrownErrorBoundary: FC<ThrownErrorBoundaryProps<ModuleError>> = (props) => {
  return <ThrownErrorBoundaryBase<ModuleError> {...props} />
}
