import { FigurlResponse } from "./FigurlRequestTypes";
export type FigurlResponseMessage = {
    type: 'figurlResponse';
    requestId: string;
    response: FigurlResponse;
};
export declare const isFigurlResponseMessage: (x: any) => x is FigurlResponseMessage;
export type SetCurrentUserMessage = {
    type: 'setCurrentUser';
    userId?: string;
    googleIdToken?: string;
};
export declare const isSetCurrentUserMessage: (x: any) => x is SetCurrentUserMessage;
export type FileDownloadProgressMessage = {
    type: 'fileDownloadProgress';
    uri: string;
    loaded: number;
    total: number;
};
export declare const isFileDownloadProgressMessage: (x: any) => x is FileDownloadProgressMessage;
export type MessageToFrontendMessage = {
    type: 'messageToFrontend';
    message: any;
};
export declare const isMessageToFrontendMessage: (x: any) => x is MessageToFrontendMessage;
export type ReportUrlStateChangeMessage = {
    type: 'reportUrlStateChange';
    state: {
        [key: string]: any;
    };
};
export declare const isReportUrlStateChangeMessage: (x: any) => x is ReportUrlStateChangeMessage;
export type MessageToChild = FigurlResponseMessage | SetCurrentUserMessage | FileDownloadProgressMessage | MessageToFrontendMessage | ReportUrlStateChangeMessage;
export declare const isMessageToChild: (x: any) => x is MessageToChild;
