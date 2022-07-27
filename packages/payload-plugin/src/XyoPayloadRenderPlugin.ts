import { CardActionAreaProps, CardContentProps, CardHeaderProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps {
  payload?: XyoPayload
}

export interface XyoPayloadRenderPluginBase {
  name: string
  canRender: (payload?: XyoPayload) => boolean
}

export interface XyoPayloadRenderPluginComponents {
  components: {
    card: {
      header: ComponentType<XyoPayloadRenderProps & CardHeaderProps>
      content: ComponentType<XyoPayloadRenderProps & CardContentProps>
      actionArea: ComponentType<XyoPayloadRenderProps & CardActionAreaProps>
    }
    table: {
      cell: ComponentType<XyoPayloadRenderProps & TableCellProps>
    }
    details: {
      box: ComponentType<XyoPayloadRenderProps & FlexBoxProps>
    }
  }
}

export interface XyoPayloadRenderPlugin extends XyoPayloadRenderPluginBase, XyoPayloadRenderPluginComponents {}
