import { IconButton, IconButtonProps } from '@mui/material'
import { Payload } from '@xyo-network/payload-model'
import { forwardRef, MouseEventHandler, ReactNode, useState } from 'react'

import { RawInfoDialog } from './Dialog'
import { xyoColorLogo } from './img'

type IconSize = 'small' | 'medium' | 'large'

const presetIconSizeValue = (size?: IconSize) => {
  switch (size) {
    case 'small': {
      return 16
    }
    case 'medium': {
      return 32
    }
    case 'large': {
      return 48
    }
  }
}

export interface RawInfoIconProps extends IconButtonProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  onCloseCallback?: () => void
  payload?: Payload
  presetIconSize?: IconSize
}

export const RawInfoIcon = forwardRef<HTMLButtonElement, RawInfoIconProps>(
  ({ dialogContent, iconOnly, iconSize = 32, onCloseCallback, payload, presetIconSize, ...props }, ref) => {
    const [open, setOpen] = useState(false)
    const size = presetIconSizeValue(presetIconSize)

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation()
      setOpen(true)
    }

    const onCloseCallBackWrapped = () => {
      setOpen(false)
      onCloseCallback?.()
    }

    return (
      <>
        <IconButton onClick={handleClick} ref={ref} {...props}>
          <img src={xyoColorLogo} height={size ?? iconSize} width={size ?? iconSize} />
        </IconButton>
        {iconOnly ? null : <RawInfoDialog payload={payload} onCloseCallback={onCloseCallBackWrapped} dialogContent={dialogContent} open={open} />}
      </>
    )
  },
)

RawInfoIcon.displayName = 'RawInfoIcon'
