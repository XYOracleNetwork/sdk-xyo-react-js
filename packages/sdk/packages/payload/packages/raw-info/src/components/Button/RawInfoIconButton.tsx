import { IconButton, IconButtonProps } from '@mui/material'
import { toJson } from '@xylabs/object'
import React, { forwardRef, MouseEventHandler, ReactNode, useMemo, useState } from 'react'

import { ExpansionProps } from '../../lib/index.js'
import { XyoColorLogo } from '../img/index.js'
import { RawInfoDialog } from '../shared/index.js'
import { IconSize, presetIconSizeValue } from './lib/index.js'

export interface RawInfoIconProps extends IconButtonProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  onCloseCallback?: () => void
  presetIconSize?: IconSize
  rawValue?: unknown
}

export const RawInfoIconButton = forwardRef<HTMLButtonElement, RawInfoIconProps>(
  (
    { defaultExpandedJson = true, dialogContent, iconOnly, iconSize = 32, onCloseCallback, rawValue, presetIconSize, updateExpandedJson, ...props },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const size = presetIconSizeValue(presetIconSize)
    const json = useMemo(() => toJson(rawValue), [rawValue])

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
          <XyoColorLogo sx={{ height: size ?? iconSize, width: size ?? iconSize }} />
        </IconButton>
        {iconOnly
          ? null
          : (
              <RawInfoDialog
                defaultExpandedJson={defaultExpandedJson}
                jsonValue={json}
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
