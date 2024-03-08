import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { Payload, WithSchema } from '@xyo-network/payload-model'
import { MouseEventHandler, ReactNode, useState } from 'react'

import { ExpansionProps } from '../../lib'
import { RawInfoDialog } from '../Dialog'
import { xyoColorLogo } from '../img'

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

export interface RawInfoButtonProps extends ButtonExProps, ExpansionProps {
  dialogContent?: ReactNode
  iconOnly?: boolean
  iconSize?: number
  onCloseCallback?: () => void
  payload?: Payload<WithSchema> | null
  presetIconSize?: IconSize
}

export const RawInfoButton: React.FC<RawInfoButtonProps> = ({
  defaultExpandedJson,
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
