import type { EmptyObject } from '@xylabs/object'
import type { FacebookPurchase } from '@xylabs/react-pixel'

import type { CustomProperties } from './CustomProperties.ts'
import { FacebookEvents } from './Facebook/index.ts'
import type { XnsPurchaseSuccessFields } from './XnsPurchaseEventHandlerInterface.ts'
import type { Events } from './XyoEventHandler.ts'
import { XyoEventHandler } from './XyoEventHandler.ts'
import type { XyoEventHandlerInterface, XyoNewsletterSignupFields } from './XyoEventHandlerInterface.ts'

export class FacebookEventHandler<T extends EmptyObject> extends XyoEventHandler<T> implements XyoEventHandlerInterface<T> {
  protected facebookEvents = new FacebookEvents<CustomProperties>()

  override get events() {
    return this.facebookEvents as Events<T>
  }

  override async xnsPurchaseSuccess(fields: XnsPurchaseSuccessFields) {
    const facebookFields: FacebookPurchase = {
      contents: [
        {
          id: fields.id,
          currency: fields.currency ?? 'USD',
          quantity: fields.quantity ?? 1,
          price: fields.price,
        },
      ],
      content_name: fields.name,
      content_ids: [fields.id],
      content_type: 'product',
      num_items: fields.quantity ?? 1,
      currency: fields.currency ?? 'USD',
      value: fields.value,
    }
    await this.facebookEvents.purchase().send(facebookFields)
  }

  override async xyoNewsletterSignup(fields: XyoNewsletterSignupFields) {
    await this.facebookEvents.lead().send({ content_category: fields.name })
  }
}
