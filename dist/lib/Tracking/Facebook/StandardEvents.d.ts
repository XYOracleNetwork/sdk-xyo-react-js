import StandardEvent from './StandardEvent';
export interface FacebookContentsItem {
    currency?: string;
    id: string;
    price?: number;
    quantity: number;
}
export interface FacebookContentProperties {
    content_category?: string;
    content_name?: string;
    content_type?: 'product' | 'product_group';
}
export interface FacebookValueProperties {
    currency?: string;
    value?: number;
}
export interface FacebookCartProperties extends FacebookValueProperties, FacebookContentProperties {
    content_ids?: (string | number)[];
    contents?: FacebookContentsItem[];
    num_items?: number;
}
export declare type FacebookAddPaymentInfo = FacebookCartProperties;
export declare type FacebookAddToCart = FacebookCartProperties;
export declare type FacebookAddToWishList = FacebookCartProperties;
export interface FacebookCompleteRegistration extends FacebookValueProperties, FacebookContentProperties {
    status?: boolean;
}
export declare type FacebookInitiateCheckout = FacebookCartProperties;
export interface FacebookLead extends FacebookContentProperties, FacebookValueProperties {
}
export declare type FacebookPurchase = FacebookCartProperties;
export interface FacebookSearch extends FacebookContentProperties, FacebookValueProperties {
    search_string?: string;
}
export interface FacebookStartTrial extends FacebookValueProperties {
    predicted_ltv?: string;
}
export interface FacebookSubscribe extends FacebookValueProperties {
    predicted_ltv?: string;
}
export declare type FacebookViewContent = FacebookCartProperties;
export declare class FacebookStandardEvents<T> {
    addPaymentInfo(): StandardEvent<FacebookCartProperties | T>;
    addToCart(): StandardEvent<FacebookCartProperties | T>;
    addToWishList(): StandardEvent<FacebookCartProperties | T>;
    completedRegistration(): StandardEvent<FacebookCompleteRegistration | T>;
    contact(): StandardEvent<T>;
    customizeProduct(): StandardEvent<T>;
    donate(): StandardEvent<T>;
    findLocation(): StandardEvent<T>;
    initiateCheckout(): StandardEvent<FacebookCartProperties | T>;
    lead(): StandardEvent<FacebookLead | T>;
    pageView(): StandardEvent<T>;
    purchase(): StandardEvent<FacebookCartProperties | T>;
    schedule(): StandardEvent<T>;
    search(): StandardEvent<FacebookSearch | T>;
    startTrial(): StandardEvent<FacebookStartTrial | T>;
    submitApplication(): StandardEvent<T>;
    subscribe(): StandardEvent<FacebookSubscribe | T>;
    viewContent(): StandardEvent<FacebookCartProperties | T>;
}
//# sourceMappingURL=StandardEvents.d.ts.map