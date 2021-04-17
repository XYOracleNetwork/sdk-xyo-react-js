import StandardEvent from './StandardEvent';
export interface GoogleBaseProperties {
    lib: 'xyga';
}
export interface GoogleAnalyticsItem {
    affiliation?: string;
    coupon?: string;
    currency?: string;
    discount?: number;
    item_brand?: string;
    item_category?: string;
    item_id: string;
    item_name: string;
    item_variant?: string;
    price?: number;
    quantity?: number;
}
export interface GoogleAdwordsItem {
    google_business_vertical: 'retail';
    id: string;
}
export interface GoogleItem extends GoogleAdwordsItem, GoogleAnalyticsItem {
}
export interface GoogleValueProperties {
    currency?: string;
    value?: number;
}
export interface GoogleItemsProperties {
    items?: GoogleItem[];
}
export interface GoogleAddPaymentInfoProperties extends GoogleValueProperties, GoogleItemsProperties {
    coupon?: string;
    payment_type?: string;
}
export interface GoogleAddShippingInfoProperties extends GoogleValueProperties, GoogleItemsProperties {
    coupon?: string;
    shipping_tier?: string;
}
export interface GoogleCartProperties extends GoogleValueProperties, GoogleItemsProperties {
}
export declare type GoogleAddToCartProperties = GoogleCartProperties;
export declare type GoogleRemoveFromCartProperties = GoogleCartProperties;
export declare type GoogleViewCartProperties = GoogleCartProperties;
export declare type GoogleViewItemProperties = GoogleCartProperties;
export interface GoogleAddToWishlistProperties extends GoogleValueProperties, GoogleItemsProperties {
}
export interface GoogleEarnVirtualCurrencyProperties {
    value?: number;
    virtual_currency_name?: string;
}
export interface GoogleSpendVirtualCurrencyProperties extends GoogleEarnVirtualCurrencyProperties {
    item_name?: string;
}
export interface GoogleBeginCheckoutProperties extends GoogleValueProperties, GoogleItemsProperties {
    coupon?: string;
}
export interface GoogleJoinGroupProperties {
    group_id?: string;
}
export interface GoogleSelectItemProperties extends GoogleItemsProperties {
    item_list_id?: string;
    item_list_name?: string;
}
export interface GoogleViewItemListProperties extends GoogleItemsProperties {
    item_list_id?: string;
    item_list_name?: string;
}
export interface GooglePromotionProperties {
    creative_name?: string;
    creative_slot?: string;
    location_id?: string;
    promotion_id?: string;
    promotion_name?: string;
}
export interface GoogleSelectPromotionProperties extends GoogleItemsProperties, GooglePromotionProperties {
}
export interface GoogleViewPromotionProperties extends GoogleItemsProperties, GooglePromotionProperties {
}
export interface GooglePurchaseProperties extends GoogleValueProperties, GoogleItemsProperties {
    affiliation?: string;
    coupon?: string;
    shipping?: number;
    tax?: number;
    transaction_id?: string;
}
export interface GoogleRefundProperties extends GoogleValueProperties, GoogleItemsProperties {
    affiliation?: string;
    coupon?: string;
    shipping?: number;
    tax?: number;
    transaction_id?: string;
}
export declare class GoogleStandardEvents<T> {
    addPaymentInfo(): StandardEvent<GoogleBaseProperties | GoogleAddPaymentInfoProperties | T>;
    addShippingInfo(): StandardEvent<GoogleBaseProperties | GoogleAddShippingInfoProperties | T>;
    addToCart(): StandardEvent<GoogleBaseProperties | GoogleCartProperties | T>;
    addToWishList(): StandardEvent<GoogleBaseProperties | GoogleAddToWishlistProperties | T>;
    beginCheckout(): StandardEvent<GoogleBaseProperties | GoogleBeginCheckoutProperties | T>;
    earnVirtualCurrency(): StandardEvent<GoogleBaseProperties | GoogleEarnVirtualCurrencyProperties | T>;
    generateLead(): StandardEvent<GoogleBaseProperties | GoogleValueProperties | T>;
    joinGroup(): StandardEvent<GoogleBaseProperties | GoogleJoinGroupProperties | T>;
    levelEnd(): StandardEvent<GoogleBaseProperties | T | {
        level_name?: string | undefined;
        success?: boolean | undefined;
    }>;
    levelStart(): StandardEvent<GoogleBaseProperties | T | {
        level_name?: string | undefined;
    }>;
    levelUp(): StandardEvent<GoogleBaseProperties | T | {
        character?: string | undefined;
        level?: number | undefined;
    }>;
    login(): StandardEvent<GoogleBaseProperties | T | {
        method?: string | undefined;
    }>;
    postScore(): StandardEvent<GoogleBaseProperties | T | {
        character?: string | undefined;
        level?: number | undefined;
        score: number;
    }>;
    purchase(): StandardEvent<GoogleBaseProperties | GooglePurchaseProperties | T>;
    refund(): StandardEvent<GoogleBaseProperties | GoogleRefundProperties | T>;
    removeFromCart(): StandardEvent<GoogleBaseProperties | GoogleCartProperties | T>;
    search(): StandardEvent<GoogleBaseProperties | T | {
        search_term?: string | undefined;
    }>;
    selectContent(): StandardEvent<GoogleBaseProperties | T | {
        content_type?: string | undefined;
        item_id?: string | undefined;
    }>;
    selectItem(): StandardEvent<GoogleBaseProperties | GoogleSelectItemProperties | T>;
    selectPromotion(): StandardEvent<GoogleBaseProperties | GoogleSelectPromotionProperties | T>;
    share(): StandardEvent<GoogleBaseProperties | T | {
        content_is?: string | undefined;
        content_type?: string | undefined;
        method?: string | undefined;
    }>;
    signUp(): StandardEvent<GoogleBaseProperties | T | {
        method?: string | undefined;
    }>;
    spendVirtualCurrency(): StandardEvent<GoogleBaseProperties | GoogleSpendVirtualCurrencyProperties | T>;
    tutorialBegin(): StandardEvent<GoogleBaseProperties | T>;
    tutorialComplete(): StandardEvent<GoogleBaseProperties | T>;
    unlockAchievement(): StandardEvent<GoogleBaseProperties | T | {
        achievement_id: string;
    }>;
    viewCart(): StandardEvent<GoogleBaseProperties | GoogleCartProperties | T>;
    viewItem(): StandardEvent<GoogleBaseProperties | GoogleCartProperties | T>;
    viewItemList(): StandardEvent<GoogleBaseProperties | GoogleViewItemListProperties | T>;
    viewPromotion(): StandardEvent<GoogleBaseProperties | GoogleViewPromotionProperties | T>;
}
//# sourceMappingURL=StandardEvents.d.ts.map