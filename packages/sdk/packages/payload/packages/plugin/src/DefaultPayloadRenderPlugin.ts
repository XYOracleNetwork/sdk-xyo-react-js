import type { Payload } from '@xyo-network/payload-model'

import {
  PayloadAvatar,
  PayloadCardActionArea,
  PayloadCardContent,
  PayloadCardHeader,
  PayloadDetailsBox,
  PayloadEditorBox,
  PayloadTableCell,
} from './components/index.ts'
import type { PayloadRenderPlugin } from './PayloadRenderPlugin.ts'

export const DefaultPayloadRenderPlugin: PayloadRenderPlugin = {
  canRender: function (payload?: Payload): boolean {
    return !!payload?.schema
  },
  components: {
    avatar: {
      image: PayloadAvatar,
    },
    box: {
      detailsBox: PayloadDetailsBox,
      editor: PayloadEditorBox,
    },
    card: {
      actionArea: PayloadCardActionArea,
      content: PayloadCardContent,
      header: PayloadCardHeader,
    },
    table: {
      cell: PayloadTableCell,
    },
  },
  name: 'Payload',
}
