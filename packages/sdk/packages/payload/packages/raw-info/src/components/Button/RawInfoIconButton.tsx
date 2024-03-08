import { IconButton, IconButtonProps } from '@mui/material'
import { JsonObject } from '@xylabs/object'
import { forwardRef, MouseEventHandler, ReactNode, useState } from 'react'

import { ExpansionProps } from '../../lib'
import { xyoColorLogo } from '../img'
import { RawInfoDialog } from '../shared'
import { IconSize, presetIconSizeValue } from './lib'

export interface RawInfoIconProps extends IconButtonProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  jsonObject?: JsonObject
  onCloseCallback?: () => void
  presetIconSize?: IconSize
}

export const RawInfoIconButton = forwardRef<HTMLButtonElement, RawInfoIconProps>(
  (
    { defaultExpandedJson = true, dialogContent, iconOnly, iconSize = 32, onCloseCallback, jsonObject, presetIconSize, updateExpandedJson, ...props },
    ref,
  ) => {
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
            jsonObject={jsonObject}
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
