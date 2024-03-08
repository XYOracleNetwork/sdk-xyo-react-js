import { IconButton, IconButtonProps } from '@mui/material'
import { Payload } from '@xyo-network/payload-model'
import { forwardRef, MouseEventHandler, ReactNode, useState } from 'react'

import { ExpansionProps } from '../../lib'
import { RawInfoDialog } from '../Dialog'
import { xyoColorLogo } from '../img'
import { IconSize, presetIconSizeValue } from './lib'

export interface RawInfoIconProps extends IconButtonProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  onCloseCallback?: () => void
  payload?: Payload
  presetIconSize?: IconSize
}

export const RawInfoIconButton = forwardRef<HTMLButtonElement, RawInfoIconProps>(
  ({ defaultExpandedJson, dialogContent, iconOnly, iconSize = 32, onCloseCallback, payload, presetIconSize, updateExpandedJson, ...props }, ref) => {
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
        {iconOnly ? null : (
          <RawInfoDialog
            defaultExpandedJson={defaultExpandedJson}
            payload={payload}
            onCloseCallback={onCloseCallBackWrapped}
            dialogContent={dialogContent}
            open={open}
            updateExpandedJson={updateExpandedJson}
          />
        )}
      </>
    )
  },
)

RawInfoIconButton.displayName = 'RawInfoIcon'
