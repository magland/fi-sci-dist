import { ToolbarItem } from './ViewToolbar';
export type OptionalToolbarActions = {
    aboveDefault?: ToolbarItem[];
    belowDefault?: ToolbarItem[];
};
declare const useActionToolbar: (props?: OptionalToolbarActions) => ToolbarItem[];
export default useActionToolbar;
