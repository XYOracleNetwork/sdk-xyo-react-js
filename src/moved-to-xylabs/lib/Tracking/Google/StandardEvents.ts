import StandardEvent from './StandardEvent'

export interface GoogleBaseProperties extends Record<string, unknown> {
  lib: 'xyga'
}

export interface GoogleAnalyticsItem {
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  item_brand?: string
  item_category?: string
  item_id: string
  item_name: string
  item_variant?: string
  price?: number
  quantity?: number
}

export interface GoogleAdwordsItem {
  google_business_vertical: 'retail'
  id: string
}

export interface GoogleItem extends GoogleAdwordsItem, GoogleAnalyticsItem {}

export interface GoogleValueProperties extends Record<string, unknown> {
  currency?: string
  value?: number
}

export interface GoogleItemsProperties extends Record<string, unknown> {
  items?: GoogleItem[]
}

export interface GoogleAddPaymentInfoProperties extends GoogleValueProperties, GoogleItemsProperties {
  coupon?: string
  payment_type?: string
}

export interface GoogleAddShippingInfoProperties extends GoogleValueProperties, GoogleItemsProperties {
  coupon?: string
  shipping_tier?: string
}

export interface GoogleCartProperties extends GoogleValueProperties, GoogleItemsProperties {}

export type GoogleAddToCartProperties = GoogleCartProperties
export type GoogleRemoveFromCartProperties = GoogleCartProperties
export type GoogleViewCartProperties = GoogleCartProperties
export type GoogleViewItemProperties = GoogleCartProperties

export interface GoogleAddToWishlistProperties extends GoogleValueProperties, GoogleItemsProperties {}

export interface GoogleEarnVirtualCurrencyProperties extends Record<string, unknown> {
  value?: number
  virtual_currency_name?: string
}

export interface GoogleSpendVirtualCurrencyProperties extends GoogleEarnVirtualCurrencyProperties {
  item_name?: string
}

export interface GoogleBeginCheckoutProperties extends GoogleValueProperties, GoogleItemsProperties {
  coupon?: string
}

export interface GoogleJoinGroupProperties extends Record<string, unknown> {
  group_id?: string
}

export interface GoogleSelectItemProperties extends GoogleItemsProperties {
  item_list_id?: string
  item_list_name?: string
}

export interface GoogleViewItemListProperties extends GoogleItemsProperties {
  item_list_id?: string
  item_list_name?: string
}

export interface GooglePromotionProperties {
  creative_name?: string
  creative_slot?: string
  location_id?: string
  promotion_id?: string
  promotion_name?: string
}

export interface GoogleSelectPromotionProperties extends GoogleItemsProperties, GooglePromotionProperties {}

export interface GoogleViewPromotionProperties extends GoogleItemsProperties, GooglePromotionProperties {}

export interface GooglePurchaseProperties extends GoogleValueProperties, GoogleItemsProperties {
  affiliation?: string
  coupon?: string
  shipping?: number
  tax?: number
  transaction_id?: string
}

export interface GoogleRefundProperties extends GoogleValueProperties, GoogleItemsProperties {
  affiliation?: string
  coupon?: string
  shipping?: number
  tax?: number
  transaction_id?: string
}

export class GoogleStandardEvents<T extends Record<string, unknown>> {
  public addPaymentInfo() {
    return new StandardEvent<GoogleBaseProperties | GoogleAddPaymentInfoProperties | T>('add_paymennt_info')
  }

  public addShippingInfo() {
    return new StandardEvent<GoogleBaseProperties | GoogleAddShippingInfoProperties | T>('add_shipping_info')
  }

  public addToCart() {
    return new StandardEvent<GoogleBaseProperties | GoogleAddToCartProperties | T>('add_to_cart')
  }

  public addToWishList() {
    return new StandardEvent<GoogleBaseProperties | GoogleAddToWishlistProperties | T>('add_to_wishlist')
  }

  public beginCheckout() {
    return new StandardEvent<GoogleBaseProperties | GoogleBeginCheckoutProperties | T>('begin_checkout')
  }

  public earnVirtualCurrency() {
    return new StandardEvent<GoogleBaseProperties | GoogleEarnVirtualCurrencyProperties | T>('earn_virtual_currency')
  }

  public generateLead() {
    return new StandardEvent<GoogleBaseProperties | GoogleValueProperties | T>('generate_lead')
  }

  public joinGroup() {
    return new StandardEvent<GoogleBaseProperties | GoogleJoinGroupProperties | T>('join_group')
  }

  public levelEnd() {
    return new StandardEvent<GoogleBaseProperties | { level_name?: string; success?: boolean } | T>('level_end')
  }

  public levelStart() {
    return new StandardEvent<GoogleBaseProperties | { level_name?: string } | T>('level_start')
  }

  public levelUp() {
    return new StandardEvent<GoogleBaseProperties | { character?: string; level?: number } | T>('level_up')
  }

  public login() {
    return new StandardEvent<GoogleBaseProperties | { method?: string } | T>('login')
  }

  public postScore() {
    return new StandardEvent<GoogleBaseProperties | { character?: string; level?: number; score: number } | T>(
      'post_score'
    )
  }

  public purchase() {
    return new StandardEvent<GoogleBaseProperties | GooglePurchaseProperties | T>('purchase')
  }

  public refund() {
    return new StandardEvent<GoogleBaseProperties | GoogleRefundProperties | T>('refund')
  }

  public removeFromCart() {
    return new StandardEvent<GoogleBaseProperties | GoogleRemoveFromCartProperties | T>('remove_from_cart')
  }

  public search() {
    return new StandardEvent<GoogleBaseProperties | { search_term?: string } | T>('search')
  }

  public selectContent() {
    return new StandardEvent<GoogleBaseProperties | { content_type?: string; item_id?: string } | T>('select_content')
  }

  public selectItem() {
    return new StandardEvent<GoogleBaseProperties | GoogleSelectItemProperties | T>('select_item')
  }

  public selectPromotion() {
    return new StandardEvent<GoogleBaseProperties | GoogleSelectPromotionProperties | T>('select_promotion')
  }

  public share() {
    return new StandardEvent<
      GoogleBaseProperties | { content_is?: string; content_type?: string; method?: string } | T
    >('share')
  }

  public signUp() {
    return new StandardEvent<GoogleBaseProperties | { method?: string } | T>('sign_up')
  }

  public spendVirtualCurrency() {
    return new StandardEvent<GoogleBaseProperties | GoogleSpendVirtualCurrencyProperties | T>('spend_virtual_currency')
  }

  public tutorialBegin() {
    return new StandardEvent<GoogleBaseProperties | T>('tutorial_begin')
  }

  public tutorialComplete() {
    return new StandardEvent<GoogleBaseProperties | T>('tutorial_complete')
  }

  public unlockAchievement() {
    return new StandardEvent<GoogleBaseProperties | { achievement_id: string } | T>('unlock_achievement')
  }

  public viewCart() {
    return new StandardEvent<GoogleBaseProperties | GoogleViewCartProperties | T>('view_cart')
  }

  public viewItem() {
    return new StandardEvent<GoogleBaseProperties | GoogleViewItemProperties | T>('view_item')
  }

  public viewItemList() {
    return new StandardEvent<GoogleBaseProperties | GoogleViewItemListProperties | T>('view_item_list')
  }

  public viewPromotion() {
    return new StandardEvent<GoogleBaseProperties | GoogleViewPromotionProperties | T>('view_promotion')
  }
}
