import { FunctionComponent, PropsWithChildren } from 'react';
import { UrlState } from './UrlStateContext';
type Props = {};
export declare const handleReportUrlStateChange: (state: UrlState) => void;
declare const SetupUrlState: FunctionComponent<PropsWithChildren<Props>>;
export declare const JSONStringifyDeterministic: (obj: any, space?: string | number | undefined) => string;
export default SetupUrlState;
