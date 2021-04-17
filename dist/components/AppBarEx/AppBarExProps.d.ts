import { AppBarProps, ToolbarProps } from '@material-ui/core';
import { ReactElement } from 'react';
interface AppBarExProps extends AppBarProps {
    container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    contextToolbar?: ReactElement<ToolbarProps>;
    systemToolbar?: ReactElement<ToolbarProps>;
}
export default AppBarExProps;
//# sourceMappingURL=AppBarExProps.d.ts.map