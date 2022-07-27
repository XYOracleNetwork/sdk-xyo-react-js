import { XyoPayload } from '@xyo-network/payload'

import { XyoPayloadCardActionArea, XyoPayloadCardContent, XyoPayloadCardHeader, XyoPayloadDetailsBox, XyoPayloadTableCell } from './components'
import { XyoPayloadRenderPlugin } from './XyoPayloadRenderPlugin'

export const defaultPayloadRenderPlugin: XyoPayloadRenderPlugin = {
  canRender: function (payload?: XyoPayload): boolean {
    return !!payload?.schema
  },
  components: {
    card: {
      actionArea: XyoPayloadCardActionArea,
      content: XyoPayloadCardContent,
      header: XyoPayloadCardHeader,
    },
    details: {
      box: XyoPayloadDetailsBox,
    },
    table: {
      cell: XyoPayloadTableCell,
    },
  },
  name: 'XyoPayload',
}
