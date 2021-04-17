import SnapTr from './Snaptr';
declare class BaseEvent<T> {
    name: string;
    snaptr: SnapTr;
    constructor(name: string);
    send(_data: T): Promise<void>;
}
export default BaseEvent;
//# sourceMappingURL=BaseEvent.d.ts.map