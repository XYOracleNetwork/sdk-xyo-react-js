import ActionStatusType from './ActionStatusType';
import DateTime from './DateTime';
import EntryPoint from './EntryPoint';
import Organization from './Organization';
import Person from './Person';
import Place from './Place';
import PostalAddress from './PostalAddress';
import Thing from './Thing';
import Time from './Time';
import VirtualLocation from './VirtualLocation';
interface Action extends Thing {
    actionStatus?: ActionStatusType;
    agent?: Organization | Person;
    endTime?: DateTime | Time;
    error?: Thing;
    instrument?: Thing;
    location?: Place | PostalAddress | string | VirtualLocation;
    object?: Thing;
    participant?: Organization | Person;
    result?: Thing;
    startTime?: DateTime | Time;
    target?: EntryPoint;
}
export default Action;
//# sourceMappingURL=Action.d.ts.map