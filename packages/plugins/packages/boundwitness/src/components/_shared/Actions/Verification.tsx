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

const InvalidIcon = ({ ref, ...props }: SvgIconProps &
  { ref?: React.Ref<SVGSVGElement | null> }) => <CancelRoundedIcon color="error" ref={ref} {...props} />
InvalidIcon.displayName = 'InvalidIcon'

export interface BWVerification extends QuickTipButtonProps {
  boundwitness?: BoundWitness
  iconColors?: boolean
}

export const BWVerification: React.FC<BWVerification> = ({ boundwitness, iconColors }) => {
  const [errors = []] = usePromise(async () => await (boundwitness ? new BoundWitnessValidator(boundwitness) : undefined)?.validate(), [boundwitness])

  return (
    <QuickTipButton
      Icon={errors.length > 0
        ? ({ ref, ...props }) => {
            return <InvalidIcon color={iconColors ? 'error' : undefined} ref={ref} {...props} />
          }
        : ({ ref, ...props }) => {
            return <CheckCircleOutlineRoundedIcon color={iconColors ? 'success' : undefined} ref={ref} {...props} />
          }}
      hoverText={errors.length > 0 ? 'Invalid Bound Witness' : 'Valid'}
    >
      {errors.length > 0
        ? (
            <FlexCol flexWrap="wrap" alignItems="start">
              {errors.map((error) => {
                return <Typography key={error.name}>{error.toString()}</Typography>
              })}
            </FlexCol>
          )
        : <Typography>No Errors</Typography>}
    </QuickTipButton>
  )
}
