import { FunctionComponent } from 'react';
export type UnitsTableBottomToolbarOptions = {
    onlyShowSelected: boolean;
};
export declare const defaultUnitsTableBottomToolbarOptions: UnitsTableBottomToolbarOptions;
type Props = {
    options: UnitsTableBottomToolbarOptions;
    setOptions: (o: UnitsTableBottomToolbarOptions) => void;
};
declare const UnitsTableBottomToolbar: FunctionComponent<Props>;
export default UnitsTableBottomToolbar;
