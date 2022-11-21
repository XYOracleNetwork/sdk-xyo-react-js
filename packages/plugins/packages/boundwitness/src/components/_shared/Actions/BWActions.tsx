import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { ellipsize } from '@xylabs/sdk-js'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'

import { BWVerification } from './Verification'

export interface BWActionsProps extends FlexBoxProps {
  hideJSONButton?: boolean
  hideValidation?: boolean
  boundwitness?: XyoBoundWitness
}

export const BWActions: React.FC<BWActionsProps> = ({ hideJSONButton, hideValidation, boundwitness, ...props }) => {
  const { hash } = boundwitness ? new PayloadWrapper(boundwitness) : { hash: '' }
  return (
    <FlexRow {...props}>
      {hideJSONButton ? null : <BWVerification boundwitness={boundwitness} />}
      {hideValidation ? null : (
        <QuickTipButton title={`JSON for ${ellipsize(hash, 8)}`}>
          <pre style={{ wordBreak: 'break-all' }}>{boundwitness ? JSON.stringify(boundwitness, null, 2) : null}</pre>
        </QuickTipButton>
      )}
    </FlexRow>
  )
}
