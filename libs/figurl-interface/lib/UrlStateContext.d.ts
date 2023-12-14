import React from 'react';
export type UrlState = {
    [key: string]: any;
};
export declare const getInitialUrlState: () => any;
declare const UrlStateContext: React.Context<{
    urlState?: UrlState | undefined;
    setUrlState?: ((s: UrlState) => void) | undefined;
}>;
export declare const useUrlState: () => {
    urlState: any;
    setUrlState: (s: UrlState) => void;
    updateUrlState: (s: {
        [key: string]: any;
    }) => void;
    initialUrlState: any;
};
export default UrlStateContext;
