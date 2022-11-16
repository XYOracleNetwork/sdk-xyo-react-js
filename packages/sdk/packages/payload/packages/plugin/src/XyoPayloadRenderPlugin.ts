import { AvatarProps, CardActionAreaProps, CardContentProps, CardHeaderProps, CardProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { ListMode } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps<T extends XyoPayload = XyoPayload> {
  payload?: T
}

export interface XyoPayloadDetailsRenderProps extends XyoPayloadRenderProps {
  listMode?: ListMode
  active?: boolean
  visibleRows?: number
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

export interface XyoPayloadRenderPluginAvatarComponents {
  image: ComponentType<XyoPayloadRenderProps & AvatarProps>
}

export interface XyoPayloadRenderPluginTableComponents {
  cell: ComponentType<XyoPayloadRenderProps & TableCellProps>
}

export interface XyoPayloadRenderPluginBoxComponents {
  listModes?: ListMode[]
  /** @deprecated - use detailsBox  */
  details?: ComponentType<XyoPayloadDetailsRenderProps & FlexBoxProps>
  detailsBox: ComponentType<XyoPayloadDetailsRenderProps & FlexBoxProps>
  detailsCard?: ComponentType<XyoPayloadDetailsRenderProps & CardProps>
  editor: ComponentType<XyoPayloadEditorRenderProps & FlexBoxProps>
}

export interface XyoPayloadRenderPluginComponents {
  card: XyoPayloadRenderPluginCardComponents
  table: XyoPayloadRenderPluginTableComponents
  box: XyoPayloadRenderPluginBoxComponents
  avatar: XyoPayloadRenderPluginAvatarComponents
}

export interface XyoPayloadRenderPluginComponentsConfig {
  card?: Partial<XyoPayloadRenderPluginCardComponents>
  table?: Partial<XyoPayloadRenderPluginTableComponents>
  box?: Partial<XyoPayloadRenderPluginBoxComponents>
  avatar?: Partial<XyoPayloadRenderPluginAvatarComponents>
}

export interface XyoPayloadRenderPlugin extends XyoPayloadRenderPluginBase {
  components: XyoPayloadRenderPluginComponents
}

export interface XyoPayloadRenderPluginConfig extends XyoPayloadRenderPluginBase {
  components?: XyoPayloadRenderPluginComponentsConfig
}
