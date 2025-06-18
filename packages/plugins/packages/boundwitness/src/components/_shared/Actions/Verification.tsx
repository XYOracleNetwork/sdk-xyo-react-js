import { ErrorQuickTipButton } from '@xylabs/react-error'
import { usePromise } from '@xylabs/react-promise'
import type { QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import React from 'react'
export interface BWVerification extends QuickTipButtonProps {
  boundwitness?: BoundWitness
  iconColors?: boolean
}

export const BWVerification: React.FC<BWVerification> = ({ boundwitness, iconColors }) => {
  const [errors = [], validateError] = usePromise(async () =>
    await (boundwitness ? new BoundWitnessValidator(boundwitness) : undefined)?.validate(), [boundwitness])

  return <ErrorQuickTipButton errors={errors} iconColors={iconColors} validateError={validateError} />
}
