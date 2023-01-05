import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import { SvgIconProps, Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { QuickTipButton, QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { forwardRef } from 'react'

const InvalidIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <CancelRoundedIcon color={'error'} ref={ref} {...props} />)
InvalidIcon.displayName = 'InvalidIcon'

export interface BWVerification extends QuickTipButtonProps {
  boundwitness?: XyoBoundWitness
}

export const BWVerification: React.FC<BWVerification> = ({ boundwitness }) => {
  const validator = boundwitness ? new BoundWitnessValidator(boundwitness) : undefined

  const errors = validator?.validate() ?? []

  return (
    <QuickTipButton Icon={errors.length ? InvalidIcon : CheckCircleOutlineRoundedIcon} hoverText={errors.length ? 'Invalid Hash' : 'Valid Hash'}>
      {errors.length > 0 ? (
        <FlexCol flexWrap="wrap" alignItems="start">
          {errors.map((error, index) => {
            return <Typography key={index}>{error.toString()}</Typography>
          })}
        </FlexCol>
      ) : (
        <Typography>No Errors</Typography>
      )}
    </QuickTipButton>
  )
}
