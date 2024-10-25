import type { ThrownErrorBoundaryProps } from '@xylabs/react-error'
import { ThrownErrorBoundary as ThrownErrorBoundaryBase } from '@xylabs/react-error'
import type { ModuleError } from '@xyo-network/payload-model'
import type { FC } from 'react'
import React from 'react'

// calling the hook outside of the component since only can be called in functional component
export const ThrownErrorBoundary: FC<ThrownErrorBoundaryProps<ModuleError>> = (props) => {
  return <ThrownErrorBoundaryBase<ModuleError> {...props} />
}
