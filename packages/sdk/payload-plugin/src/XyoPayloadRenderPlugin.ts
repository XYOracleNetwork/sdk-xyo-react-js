import { CardActionAreaProps, CardContentProps, CardHeaderProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { ListMode } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps {
  payload?: XyoPayload
}

export interface XyoPayloadDetailsRenderProps extends XyoPayloadRenderProps {
  listMode?: ListMode
}

export interface XyoPayloadEditorRenderProps extends XyoPayloadDetailsRenderProps {
  onChange?: (payload: XyoPayload) => boolean
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
  listModes?: ListMode[]
  details: ComponentType<XyoPayloadDetailsRenderProps & FlexBoxProps>
  editor: ComponentType<XyoPayloadEditorRenderProps & FlexBoxProps>
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

export interface XyoRenderPlugin extends XyoPayloadRenderPlugin {
  slug: string
  defaultFullScreen?: boolean
}
