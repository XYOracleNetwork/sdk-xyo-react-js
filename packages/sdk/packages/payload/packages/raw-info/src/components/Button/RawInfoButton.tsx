import { toJson } from '@xylabs/object'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import React, { MouseEventHandler, ReactNode, useMemo, useState } from 'react'

import { ExpansionProps } from '../../lib/index.js'
import { XyoColorLogo } from '../img/index.js'
import { RawInfoDialog } from '../shared/index.js'
import { IconSize, presetIconSizeValue } from './lib/index.js'

export interface RawInfoButtonProps extends ButtonExProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  onCloseCallback?: () => void
  presetIconSize?: IconSize
  rawValue?: unknown
}

export const RawInfoButton: React.FC<RawInfoButtonProps> = ({
  defaultExpandedJson = true,
  dialogContent,
  iconOnly,
  iconSize = 24,
  onCloseCallback,
  children,
  rawValue,
  presetIconSize,
  updateExpandedJson,
  ...props
}) => {
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
    <span>
      <ButtonEx
        variant="outlined"
        size="small"
        startIcon={<XyoColorLogo sx={{ height: size ?? iconSize, width: size ?? iconSize }} />}
        onClick={handleClick}
        disabled={iconOnly ? false : !rawValue}
        {...props}
      >
        {children ?? <span>Data</span>}
      </ButtonEx>
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
    </span>
  )
}
