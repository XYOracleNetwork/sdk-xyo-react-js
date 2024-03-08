import { JsonObject } from '@xylabs/object'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { MouseEventHandler, ReactNode, useState } from 'react'

import { ExpansionProps } from '../../lib'
import { xyoColorLogo } from '../img'
import { RawInfoDialog } from '../shared'
import { IconSize, presetIconSizeValue } from './lib'

export interface RawInfoButtonProps extends ButtonExProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  jsonObject?: JsonObject | null
  onCloseCallback?: () => void
  presetIconSize?: IconSize
}

export const RawInfoButton: React.FC<RawInfoButtonProps> = ({
  defaultExpandedJson = true,
  dialogContent,
  iconOnly,
  iconSize = 24,
  onCloseCallback,
  children,
  jsonObject,
  presetIconSize,
  updateExpandedJson,
  ...props
}) => {
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
    <span>
      <ButtonEx
        variant="outlined"
        size="small"
        startIcon={<img src={xyoColorLogo} height={size ?? iconSize} width={size ?? iconSize} />}
        onClick={handleClick}
        disabled={iconOnly ? false : !jsonObject}
        {...props}
      >
        {children ?? <span>Data</span>}
      </ButtonEx>
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
    </span>
  )
}
