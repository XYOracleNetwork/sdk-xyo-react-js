import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { Payload, WithSchema } from '@xyo-network/payload-model'
import { MouseEventHandler, ReactNode, useState } from 'react'

import { ExpansionProps } from '../../lib'
import { xyoColorLogo } from '../img'
import { RawInfoDialog } from '../shared'
import { IconSize, presetIconSizeValue } from './lib'

export interface RawInfoButtonProps extends ButtonExProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  onCloseCallback?: () => void
  payload?: Payload<WithSchema> | null
  presetIconSize?: IconSize
}

export const RawInfoButton: React.FC<RawInfoButtonProps> = ({
  defaultExpandedJson = true,
  dialogContent,
  iconOnly,
  iconSize = 24,
  onCloseCallback,
  children,
  payload,
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
        disabled={iconOnly ? false : !payload}
        {...props}
      >
        {children ?? <span>Data</span>}
      </ButtonEx>
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
    </span>
  )
}
