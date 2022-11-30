import { Chip } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { ellipsize } from '@xylabs/sdk-js'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { ReactNode } from 'react'

import { BWPreviousHashQuickTipButton } from './PreviousHash'
import { BWVerification } from './Verification'

export interface BWActionsProps extends FlexBoxProps {
  hideJSONButton?: boolean
  hideValidation?: boolean
  hidePreviousHash?: boolean
  hideTimestamp?: boolean
  boundwitness?: XyoBoundWitness
  additionalActions?: ReactNode
}

export const BWActions: React.FC<BWActionsProps> = ({
  additionalActions,
  hideJSONButton,
  hideValidation,
  hidePreviousHash,
  hideTimestamp,
  boundwitness,
  ...props
}) => {
  const { hash } = boundwitness ? new PayloadWrapper(boundwitness) : { hash: '' }

  return (
    <FlexRow {...props}>
      {hideTimestamp || boundwitness?.timestamp === undefined ? null : (
        <Chip sx={{ mr: 1 }} label={new Date(boundwitness.timestamp).toLocaleString()} />
      )}
      {hidePreviousHash || boundwitness?.previous_hashes.length === 0 ? null : <BWPreviousHashQuickTipButton boundwitness={boundwitness} />}
      {hideJSONButton ? null : <BWVerification boundwitness={boundwitness} />}
      {hideValidation ? null : (
        <QuickTipButton title={`JSON for ${ellipsize(hash, 8)}`} dialogProps={{ fullWidth: true, maxWidth: 'md' }}>
          <pre style={{ wordBreak: 'break-all' }}>{boundwitness ? JSON.stringify(boundwitness, null, 2) : null}</pre>
        </QuickTipButton>
      )}
      {additionalActions}
    </FlexRow>
  )
}
