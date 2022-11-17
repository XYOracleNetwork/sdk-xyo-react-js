import { XyoPayload } from '@xyo-network/payload'

import {
  XyoPayloadAvatar,
  XyoPayloadCardActionArea,
  XyoPayloadCardContent,
  XyoPayloadCardHeader,
  XyoPayloadDetailsBox,
  XyoPayloadEditorBox,
  XyoPayloadTableCell,
} from './components'
import { XyoPayloadRenderPlugin } from './XyoPayloadRenderPlugin'

export const DefaultPayloadRenderPlugin: XyoPayloadRenderPlugin = {
  canRender: function (payload?: XyoPayload): boolean {
    return !!payload?.schema
  },
  components: {
    avatar: {
      image: XyoPayloadAvatar,
    },
    box: {
      detailsBox: XyoPayloadDetailsBox,
      editor: XyoPayloadEditorBox,
    },
    card: {
      actionArea: XyoPayloadCardActionArea,
      content: XyoPayloadCardContent,
      header: XyoPayloadCardHeader,
    },
    table: {
      cell: XyoPayloadTableCell,
    },
  },
  name: 'XyoPayload',
}
