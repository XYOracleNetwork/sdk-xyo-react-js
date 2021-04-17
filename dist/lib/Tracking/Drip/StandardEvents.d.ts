import BaseEvent from './BaseEvent';
import { DripIdentifyData } from './Data';
declare class StandardEvents<T> {
    identify(): BaseEvent<T | DripIdentifyData>;
}
export default StandardEvents;
//# sourceMappingURL=StandardEvents.d.ts.map