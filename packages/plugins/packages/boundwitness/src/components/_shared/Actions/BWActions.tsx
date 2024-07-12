import { DataObject as DataObjectIcon } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { ellipsize } from '@xylabs/eth-address'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { BWPreviousHashQuickTipButton } from './PreviousHash.js'
import { BWVerification } from './Verification.js'

export interface BWActionsProps extends FlexBoxProps {
  additionalActions?: ReactNode
  boundwitness?: BoundWitness
  hideJSONButton?: boolean
  hidePreviousHash?: boolean
  hideTimestamp?: boolean
  hideValidation?: boolean
}

export const BWActions: React.FC<BWActionsProps> = ({
  additionalActions,
  boundwitness,
  hideJSONButton,
  hideValidation,
  hidePreviousHash,
  hideTimestamp,
  ...props
}) => {
  const hash = usePayloadHash(boundwitness)

  return (
    <FlexRow {...props}>
      {hideTimestamp || boundwitness?.timestamp === undefined ? null : (
        <Chip sx={{ mr: 1 }} label={new Date(boundwitness.timestamp).toLocaleString()} />
      )}
      {hidePreviousHash || boundwitness?.previous_hashes.length === 0 ? null : <BWPreviousHashQuickTipButton boundwitness={boundwitness} />}
      {hideValidation ? null : <BWVerification boundwitness={boundwitness} />}
      {hideJSONButton ? null : (
        <QuickTipButton Icon={DataObjectIcon} title={`JSON for ${ellipsize(hash ?? '', 8)}`} dialogProps={{ fullWidth: true, maxWidth: 'md' }}>
          <pre style={{ wordBreak: 'break-all' }}>{boundwitness ? JSON.stringify(boundwitness, null, 2) : null}</pre>
        </QuickTipButton>
      )}
      {additionalActions}
    </FlexRow>
  )
}
