import BaseEvent from './BaseEvent';
import SnapchatStandardProperties from './StandardProperties';
declare class StandardEvent<T extends SnapchatStandardProperties> extends BaseEvent<T> {
    send(data: T): Promise<void>;
}
export default StandardEvent;
//# sourceMappingURL=StandardEvent.d.ts.map