import Fbq from './Fbq';
declare class BaseEvent<T> {
    name: string;
    fbq: Fbq;
    constructor(name: string);
    send(_data: T): Promise<void>;
}
export default BaseEvent;
//# sourceMappingURL=BaseEvent.d.ts.map