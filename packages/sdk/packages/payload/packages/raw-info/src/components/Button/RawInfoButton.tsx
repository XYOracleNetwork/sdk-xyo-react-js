import { toJson } from '@xylabs/object'
import type { ButtonExProps } from '@xylabs/react-button'
import { ButtonEx } from '@xylabs/react-button'
import type { MouseEventHandler, ReactNode } from 'react'
import React, { useMemo, useState } from 'react'

import type { ExpansionProps } from '../../lib/index.ts'
import { XyoColorLogo } from '../img/index.tsx'
import { RawInfoDialog } from '../shared/index.ts'
import type { IconSize } from './lib/index.ts'
import { presetIconSizeValue } from './lib/index.ts'

export type RawInfoButtonProps = ButtonExProps & ExpansionProps & {
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
        startIcon={(
          <XyoColorLogo sx={{ height: size ?? iconSize, width: size ?? iconSize }} />
        )}
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
