import { AvatarProps, CardActionAreaProps, CardContentProps, CardHeaderProps, CardProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload-model'
import { ListMode } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

export interface XyoPayloadRenderProps<T extends XyoPayload = XyoPayload> {
  payload?: T
}

export interface XyoPayloadDetailsRenderProps extends XyoPayloadRenderProps {
  active?: boolean
  listMode?: ListMode
  visibleRows?: number
}

export interface XyoPayloadEditorRenderProps extends XyoPayloadDetailsRenderProps {
  onChange?: (payload: XyoPayload) => boolean
}

export interface XyoPayloadRenderPluginBase {
  canRender: (payload?: XyoPayload) => boolean
  name: string
}

export interface XyoPayloadRenderPluginCardComponents {
  actionArea: ComponentType<XyoPayloadRenderProps & CardActionAreaProps>
  content: ComponentType<XyoPayloadRenderProps & CardContentProps>
  header: ComponentType<XyoPayloadRenderProps & CardHeaderProps>
}

export interface XyoPayloadRenderPluginAvatarComponents {
  image: ComponentType<XyoPayloadRenderProps & AvatarProps>
}

export interface XyoPayloadRenderPluginTableComponents {
  cell: ComponentType<XyoPayloadRenderProps & TableCellProps>
}

export interface XyoPayloadRenderPluginBoxComponents {
  /** @deprecated - use detailsBox  */
  details?: ComponentType<XyoPayloadDetailsRenderProps & FlexBoxProps>
  detailsBox: ComponentType<XyoPayloadDetailsRenderProps & FlexBoxProps>
  detailsCard?: ComponentType<XyoPayloadDetailsRenderProps & CardProps>
  editor: ComponentType<XyoPayloadEditorRenderProps & FlexBoxProps>
  listModes?: ListMode[]
}

export interface XyoPayloadRenderPluginComponents {
  avatar: XyoPayloadRenderPluginAvatarComponents
  box: XyoPayloadRenderPluginBoxComponents
  card: XyoPayloadRenderPluginCardComponents
  table: XyoPayloadRenderPluginTableComponents
}

export interface XyoPayloadRenderPluginComponentsConfig {
  avatar?: Partial<XyoPayloadRenderPluginAvatarComponents>
  box?: Partial<XyoPayloadRenderPluginBoxComponents>
  card?: Partial<XyoPayloadRenderPluginCardComponents>
  table?: Partial<XyoPayloadRenderPluginTableComponents>
}

export interface XyoPayloadRenderPlugin extends XyoPayloadRenderPluginBase {
  components: XyoPayloadRenderPluginComponents
}

export interface XyoPayloadRenderPluginConfig extends XyoPayloadRenderPluginBase {
  components?: XyoPayloadRenderPluginComponentsConfig
}
