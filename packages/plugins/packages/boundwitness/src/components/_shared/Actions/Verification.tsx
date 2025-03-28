import { CancelRounded as CancelRoundedIcon, CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon } from '@mui/icons-material'
import type { SvgIconProps } from '@mui/material'
import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import type { QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import React from 'react'

const InvalidIcon = ({ ref, ...props }: SvgIconProps) =>
  <CancelRoundedIcon color="error" ref={ref} {...props} />

InvalidIcon.displayName = 'InvalidIcon'

export interface BWVerification extends QuickTipButtonProps {
  boundwitness?: BoundWitness
}

export const BWVerification: React.FC<BWVerification> = ({ boundwitness }) => {
  const [errors = []] = usePromise(async () => await (boundwitness ? new BoundWitnessValidator(boundwitness) : undefined)?.validate(), [boundwitness])

  return (
    <QuickTipButton
      Icon={errors.length > 0 ? InvalidIcon : CheckCircleOutlineRoundedIcon}
      hoverText={errors.length > 0 ? 'Invalid Bound Witness' : 'Valid'}
    >
      {errors.length > 0
        ? (
            <FlexCol flexWrap="wrap" alignItems="start">
              {errors.map((error, index) => {
                return <Typography key={index}>{error.toString()}</Typography>
              })}
            </FlexCol>
          )
        : <Typography>No Errors</Typography>}
    </QuickTipButton>
  )
}
