import { BoxProps } from '@material-ui/core';
import React from 'react';
interface Props extends BoxProps {
    errors?: Error[];
    onRetry?: () => void;
}
declare const ErrorsViewer: React.FC<Props>;
export default ErrorsViewer;
//# sourceMappingURL=ErrorsViewer.d.ts.map