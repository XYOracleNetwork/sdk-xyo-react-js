import BaseEvent from './BaseEvent';
declare class StandardEvent<T> extends BaseEvent<T> {
    send(data: T): Promise<void>;
}
export default StandardEvent;
//# sourceMappingURL=StandardEvent.d.ts.map