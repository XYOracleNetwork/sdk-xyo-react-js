declare type DripEvent<T extends Record<string, any>> = (string | T)[];
declare class BaseEvent<T> {
    name: string;
    param?: string;
    dcq: DripEvent<T>[];
    dcs: any;
    constructor(name: string, param?: string);
    send(data: T): Promise<void>;
    private getDcq;
    private getDcs;
}
export default BaseEvent;
//# sourceMappingURL=BaseEvent.d.ts.map