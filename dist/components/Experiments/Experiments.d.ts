import React, { ReactElement } from 'react';
import { ExperimentProps } from './Experiment';
declare type Props = {
    children: ReactElement<ExperimentProps>[] | ReactElement<ExperimentProps>;
    localStorageProp?: string | boolean;
    name: string;
    testStarted: () => Promise<void>;
};
declare const Experiments: React.FC<Props>;
export default Experiments;
//# sourceMappingURL=Experiments.d.ts.map