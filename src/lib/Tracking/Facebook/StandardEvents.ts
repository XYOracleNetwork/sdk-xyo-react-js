import StandardEvent from './StandardEvent'

export interface FacebookContentsItem {
  currency?: string
  id: string
  price?: number
  quantity: number
}

export interface FacebookContentProperties {
  content_category?: string
  content_name?: string
  content_type?: 'product' | 'product_group'
}

export interface FacebookValueProperties {
  currency?: string
  value?: number
}

export interface FacebookCartProperties extends FacebookValueProperties, FacebookContentProperties {
  content_ids?: (string | number)[]
  contents?: FacebookContentsItem[]
  num_items?: number
}

export type FacebookAddPaymentInfo = FacebookCartProperties

export type FacebookAddToCart = FacebookCartProperties

export type FacebookAddToWishList = FacebookCartProperties

export interface FacebookCompleteRegistration extends FacebookValueProperties, FacebookContentProperties {
  status?: boolean
}

export type FacebookInitiateCheckout = FacebookCartProperties

export interface FacebookLead extends FacebookContentProperties, FacebookValueProperties {}

export type FacebookPurchase = FacebookCartProperties

export interface FacebookSearch extends FacebookContentProperties, FacebookValueProperties {
  search_string?: string
}

export interface FacebookStartTrial extends FacebookValueProperties {
  predicted_ltv?: string
}

export interface FacebookSubscribe extends FacebookValueProperties {
  predicted_ltv?: string
}

export type FacebookViewContent = FacebookCartProperties

export class FacebookStandardEvents<T> {
  public addPaymentInfo() {
    return new StandardEvent<FacebookAddPaymentInfo | T>('AddPaymentInfo')
  }

  public addToCart() {
    return new StandardEvent<FacebookAddToCart | T>('AddToCart')
  }

  public addToWishList() {
    return new StandardEvent<FacebookAddToWishList | T>('AddToWishList')
  }

  public completedRegistration() {
    return new StandardEvent<FacebookCompleteRegistration | T>('CompleteRegistration')
  }

  public contact() {
    return new StandardEvent<T>('Contact')
  }

  public customizeProduct() {
    return new StandardEvent<T>('CustomizeProduct')
  }

  public donate() {
    return new StandardEvent<T>('Donate')
  }

  public findLocation() {
    return new StandardEvent<T>('FindLocation')
  }

  public initiateCheckout() {
    return new StandardEvent<FacebookInitiateCheckout | T>('InitiateCheckout')
  }

  public lead() {
    return new StandardEvent<FacebookLead | T>('Lead')
  }

  public pageView() {
    return new StandardEvent<T>('PageView')
  }

  public purchase() {
    return new StandardEvent<FacebookPurchase | T>('Purchase')
  }

  public schedule() {
    return new StandardEvent<T>('Schedule')
  }

  public search() {
    return new StandardEvent<FacebookSearch | T>('Search')
  }

  public startTrial() {
    return new StandardEvent<FacebookStartTrial | T>('StartTrial')
  }

  public submitApplication() {
    return new StandardEvent<T>('SubmitApplication')
  }

  public subscribe() {
    return new StandardEvent<FacebookSubscribe | T>('Subscribe')
  }

  public viewContent() {
    return new StandardEvent<FacebookViewContent | T>('ViewContent')
  }
}
