import type {
  AvatarProps,
  CardActionAreaProps,
  CardContentProps,
  CardHeaderProps,
  CardProps,
  MenuItemProps,
  MenuListProps,
  TableCellProps,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import type { ListMode } from '@xyo-network/react-shared'
import type {
  ComponentType, ForwardRefExoticComponent, PropsWithoutRef,
} from 'react'

export interface PayloadRenderProps<T extends Payload = Payload> {
  payload?: T
}

export interface PayloadDetailsRenderProps extends PayloadRenderProps {
  active?: boolean
}

export interface PayloadDetailsListRenderProps extends PayloadDetailsRenderProps {
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
  actionArea: ForwardRefExoticComponent<PropsWithoutRef<PayloadRenderProps & CardActionAreaProps>>
  content: ForwardRefExoticComponent<PropsWithoutRef<PayloadRenderProps & CardContentProps>>
  header: ForwardRefExoticComponent<PropsWithoutRef<PayloadRenderProps & CardHeaderProps>>
}

export interface PayloadRenderPluginAvatarComponents {
  image: ComponentType<PayloadRenderProps & AvatarProps>
}

export interface PayloadRenderPluginTableComponents {
  cell: ComponentType<PayloadRenderProps & TableCellProps>
}

export interface PayloadRenderPluginMenuComponents {
  item: ForwardRefExoticComponent<PropsWithoutRef<PayloadRenderProps & MenuItemProps>>
  list: ForwardRefExoticComponent<PropsWithoutRef<PayloadRenderProps & MenuListProps>>
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
  menu?: Partial<PayloadRenderPluginMenuComponents>
  table?: Partial<PayloadRenderPluginTableComponents>
}

export interface PayloadRenderPlugin extends PayloadRenderPluginBase {
  components: PayloadRenderPluginComponents
}

export interface PayloadRenderPluginConfig extends PayloadRenderPluginBase {
  components?: PayloadRenderPluginComponentsConfig
}
