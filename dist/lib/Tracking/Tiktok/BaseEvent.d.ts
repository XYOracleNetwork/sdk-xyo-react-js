import Ttq from './Ttq';
declare class BaseEvent<T> {
    name: string;
    ttq: Ttq;
    constructor(name: string);
    send(_data: T): Promise<void>;
}
export default BaseEvent;
//# sourceMappingURL=BaseEvent.d.ts.map