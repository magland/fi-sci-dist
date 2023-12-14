import { FunctionComponent } from 'react';
interface Props {
    width: number;
    height: number;
    top?: number;
    topPadding?: number;
    customActions?: any[] | null;
    useHorizontalLayout?: boolean;
}
declare const ViewToolbar: FunctionComponent<Props>;
export default ViewToolbar;
