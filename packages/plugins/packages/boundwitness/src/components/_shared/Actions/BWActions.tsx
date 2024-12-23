import { DataObject as DataObjectIcon } from '@mui/icons-material'
import { ellipsize } from '@xylabs/eth-address'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'
import React from 'react'

import { BWPreviousHashQuickTipButton } from './PreviousHash.tsx'
import { BWVerification } from './Verification.tsx'

export interface BWActionsProps extends FlexBoxProps {
  additionalActions?: ReactNode
  boundwitness?: BoundWitness
  hideJSONButton?: boolean
  hidePreviousHash?: boolean
  hideValidation?: boolean
}

export const BWActions: React.FC<BWActionsProps> = ({
  additionalActions,
  boundwitness,
  hideJSONButton,
  hideValidation,
  hidePreviousHash,
  ...props
}) => {
  const hash = usePayloadHash(boundwitness)

  return (
    <FlexRow {...props}>
      {hidePreviousHash || boundwitness?.previous_hashes.length === 0 ? null : <BWPreviousHashQuickTipButton boundwitness={boundwitness} />}
      {hideValidation ? null : <BWVerification boundwitness={boundwitness} />}
      {hideJSONButton
        ? null
        : (
            <QuickTipButton
              Icon={DataObjectIcon}
              title={`JSON for ${ellipsize(hash ?? '', 8)}`}
              dialogProps={{ fullWidth: true, maxWidth: 'md' }}
            >
              <pre style={{ wordBreak: 'break-all' }}>{boundwitness ? JSON.stringify(boundwitness, null, 2) : null}</pre>
            </QuickTipButton>
          )}
      {additionalActions}
    </FlexRow>
  )
}
