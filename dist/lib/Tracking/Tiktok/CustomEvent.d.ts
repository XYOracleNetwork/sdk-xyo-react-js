import BaseEvent from './BaseEvent';
declare class CustomEvent<T> extends BaseEvent<T> {
    send(data: T): Promise<void>;
}
export default CustomEvent;
//# sourceMappingURL=CustomEvent.d.ts.map