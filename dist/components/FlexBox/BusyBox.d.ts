import { BoxProps } from '@material-ui/core';
import React from 'react';
interface BusyBoxProps extends BoxProps {
    busy?: boolean;
    busyOpacity?: string | number;
    busySize?: number;
}
declare const BusyBox: React.ComponentType<BusyBoxProps>;
export { BusyBox };
export type { BusyBoxProps };
//# sourceMappingURL=BusyBox.d.ts.map