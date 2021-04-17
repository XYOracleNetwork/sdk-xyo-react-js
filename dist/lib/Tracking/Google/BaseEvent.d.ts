import Gtag from './Gtag';
import Gtm from './Gtm';
declare class BaseEvent<T> {
    name: string;
    protected adwordConversionId?: string;
    constructor(name: string, adwordConversionId?: string);
    send(data: T): Promise<void>;
    sendGtag(data: T): Promise<void>;
    sendGtm(data: T): Promise<void>;
    gtag(): Gtag;
    gtm(): Gtm;
}
export default BaseEvent;
//# sourceMappingURL=BaseEvent.d.ts.map