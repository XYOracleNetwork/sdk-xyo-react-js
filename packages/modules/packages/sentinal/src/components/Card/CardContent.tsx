import type { CardContentProps } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import { ModuleCardContent } from '@xyo-network/react-module'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import React from 'react'

export type SentinelCardContentProps = ModuleRenderProps<SentinelInstance>
  & CardContentProps & {
    report?: Payload[]
  }

export const SentinelCardContent: React.FC<SentinelCardContentProps> = ({
  children, report, mod, ...props
}) => {
  return (
    <ModuleCardContent mod={mod} {...props}>
      <FlexGrowRow flexWrap="wrap" justifyContent="start" gap={2}>
        {report
          ? <JsonViewerEx value={report} />
          : null}
        {children}
      </FlexGrowRow>
    </ModuleCardContent>
  )
}
