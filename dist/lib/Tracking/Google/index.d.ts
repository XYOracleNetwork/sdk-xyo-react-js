import GoogleBaseEvent from './BaseEvent';
import GoogleCustomEvent from './CustomEvent';
import Gtag from './Gtag';
import Gtm from './Gtm';
export * from './StandardEvents';
export interface GoogleViewContent {
    name: string;
    path: string;
}
export interface GoogleUserClick {
    elementName: string;
    elementType: string;
}
export { GoogleBaseEvent, GoogleCustomEvent, Gtag, Gtm };
//# sourceMappingURL=index.d.ts.map