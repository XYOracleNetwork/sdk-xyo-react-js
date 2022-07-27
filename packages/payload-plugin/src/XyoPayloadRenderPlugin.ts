import { CardActionAreaProps, CardContentProps, CardHeaderProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps<T extends XyoPayload = XyoPayload> {
  payload?: T
}

export interface XyoPayloadRenderPlugin<T extends XyoPayload = XyoPayload> {
  name: string
  components?: {
    card?: {
      header?: ComponentType<XyoPayloadRenderProps<T> & CardHeaderProps>
      content?: ComponentType<XyoPayloadRenderProps<T> & CardContentProps>
      actionArea?: ComponentType<XyoPayloadRenderProps<T> & CardActionAreaProps>
    }
    table?: {
      cell?: ComponentType<XyoPayloadRenderProps<T> & TableCellProps>
    }
    details?: {
      box?: ComponentType<XyoPayloadRenderProps<T> & FlexBoxProps>
    }
  }
  canRender: (payload?: T) => boolean
}
