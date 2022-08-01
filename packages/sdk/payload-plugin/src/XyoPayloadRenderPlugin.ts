import { CardActionAreaProps, CardContentProps, CardHeaderProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { Paradigm } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps {
  payload?: XyoPayload
  paradigm?: Paradigm
}

export interface XyoPayloadRenderPluginBase {
  name: string
  canRender: (payload?: XyoPayload) => boolean
}

export interface XyoPayloadRenderPluginCardComponents {
  header: ComponentType<XyoPayloadRenderProps & CardHeaderProps>
  content: ComponentType<XyoPayloadRenderProps & CardContentProps>
  actionArea: ComponentType<XyoPayloadRenderProps & CardActionAreaProps>
}

export interface XyoPayloadRenderPluginTableComponents {
  cell: ComponentType<XyoPayloadRenderProps & TableCellProps>
}

export interface XyoPayloadRenderPluginBoxComponents {
  details: ComponentType<XyoPayloadRenderProps & FlexBoxProps>
}

export interface XyoPayloadRenderPluginComponents {
  card: XyoPayloadRenderPluginCardComponents
  table: XyoPayloadRenderPluginTableComponents
  box: XyoPayloadRenderPluginBoxComponents
}

export interface XyoPayloadRenderPluginComponentsConfig {
  card?: Partial<XyoPayloadRenderPluginCardComponents>
  table?: Partial<XyoPayloadRenderPluginTableComponents>
  box?: Partial<XyoPayloadRenderPluginBoxComponents>
}

export interface XyoPayloadRenderPlugin extends XyoPayloadRenderPluginBase {
  components: XyoPayloadRenderPluginComponents
}

export interface XyoPayloadRenderPluginConfig extends XyoPayloadRenderPluginBase {
  components?: XyoPayloadRenderPluginComponentsConfig
}
