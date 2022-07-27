import { CardActionAreaProps, CardContentProps, CardHeaderProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps {
  payload?: XyoPayload
}

export interface XyoPayloadRenderPlugin {
  name: string
  components?: {
    card?: {
      header?: ComponentType<XyoPayloadRenderProps & CardHeaderProps>
      content?: ComponentType<XyoPayloadRenderProps & CardContentProps>
      actionArea?: ComponentType<XyoPayloadRenderProps & CardActionAreaProps>
    }
    table?: {
      cell?: ComponentType<XyoPayloadRenderProps & TableCellProps>
    }
    details?: {
      box?: ComponentType<XyoPayloadRenderProps & FlexBoxProps>
    }
  }
  canRender: (payload?: XyoPayload) => boolean
}
