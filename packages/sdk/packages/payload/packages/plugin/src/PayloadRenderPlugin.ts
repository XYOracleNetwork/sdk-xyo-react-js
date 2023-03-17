import { AvatarProps, CardActionAreaProps, CardContentProps, CardHeaderProps, CardProps, TableCellProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { ListMode } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

export interface PayloadRenderProps<T extends Payload = Payload> {
  payload?: T
}

export interface PayloadDetailsRenderProps extends PayloadRenderProps {
  active?: boolean
  listMode?: ListMode
  visibleRows?: number
}

export interface PayloadEditorRenderProps extends PayloadDetailsRenderProps {
  onChange?: (payload: Payload) => boolean
}

export interface PayloadRenderPluginBase {
  canRender: (payload?: Payload) => boolean
  name: string
}

export interface PayloadRenderPluginCardComponents {
  actionArea: ComponentType<PayloadRenderProps & CardActionAreaProps>
  content: ComponentType<PayloadRenderProps & CardContentProps>
  header: ComponentType<PayloadRenderProps & CardHeaderProps>
}

export interface PayloadRenderPluginAvatarComponents {
  image: ComponentType<PayloadRenderProps & AvatarProps>
}

export interface PayloadRenderPluginTableComponents {
  cell: ComponentType<PayloadRenderProps & TableCellProps>
}

export interface PayloadRenderPluginBoxComponents {
  /** @deprecated - use detailsBox  */
  details?: ComponentType<PayloadDetailsRenderProps & FlexBoxProps>
  detailsBox: ComponentType<PayloadDetailsRenderProps & FlexBoxProps>
  detailsCard?: ComponentType<PayloadDetailsRenderProps & CardProps>
  editor: ComponentType<PayloadEditorRenderProps & FlexBoxProps>
  listModes?: ListMode[]
}

export interface PayloadRenderPluginComponents {
  avatar: PayloadRenderPluginAvatarComponents
  box: PayloadRenderPluginBoxComponents
  card: PayloadRenderPluginCardComponents
  table: PayloadRenderPluginTableComponents
}

export interface PayloadRenderPluginComponentsConfig {
  avatar?: Partial<PayloadRenderPluginAvatarComponents>
  box?: Partial<PayloadRenderPluginBoxComponents>
  card?: Partial<PayloadRenderPluginCardComponents>
  table?: Partial<PayloadRenderPluginTableComponents>
}

export interface PayloadRenderPlugin extends PayloadRenderPluginBase {
  components: PayloadRenderPluginComponents
}

export interface PayloadRenderPluginConfig extends PayloadRenderPluginBase {
  components?: PayloadRenderPluginComponentsConfig
}
