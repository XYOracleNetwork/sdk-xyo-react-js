import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { ellipsize } from '@xylabs/sdk-js'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { ReactNode } from 'react'

import { BWVerification } from './Verification'

export interface BWActionsProps extends FlexBoxProps {
  hideJSONButton?: boolean
  hideValidation?: boolean
  hidePreviousHash?: boolean
  boundwitness?: XyoBoundWitness
  additionalActions?: ReactNode
}

export const BWActions: React.FC<BWActionsProps> = ({
  additionalActions,
  hideJSONButton,
  hideValidation,
  hidePreviousHash,
  boundwitness,
  ...props
}) => {
  const { hash } = boundwitness ? new PayloadWrapper(boundwitness) : { hash: '' }
  const previousHash = boundwitness?.previous_hashes[0] ?? null
  const formattedPreviousHash = previousHash === null ? 'No Previous Hash' : `Previous Hash - ${ellipsize(previousHash, 8)}`
  return (
    <FlexRow {...props}>
      {hidePreviousHash && boundwitness?.previous_hashes.length ? null : (
        <QuickTipButton Icon={LinkRoundedIcon} disableDialog hoverText={formattedPreviousHash} />
      )}
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
