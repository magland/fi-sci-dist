export type GetFigureDataRequest = {
    type: 'getFigureData';
};
export declare const isGetFigureDataRequest: (x: any) => x is GetFigureDataRequest;
export type GetFigureDataResponse = {
    type: 'getFigureData';
    figureData: any;
};
export declare const isGetFigureDataResponse: (x: any) => x is GetFigureDataResponse;
export type GetFileDataRequest = {
    type: 'getFileData';
    uri: string;
    responseType?: string;
    startByte?: number;
    endByte?: number;
};
export declare const isGetFileDataRequest: (x: any) => x is GetFileDataRequest;
export type GetFileDataResponse = {
    type: 'getFileData';
    fileData?: any;
    errorMessage?: string;
};
export declare const isGetFileDataResponse: (x: any) => x is GetFileDataResponse;
export type GetFileDataUrlRequest = {
    type: 'getFileDataUrl';
    uri: string;
};
export declare const isGetFileDataUrlRequest: (x: any) => x is GetFileDataUrlRequest;
export type GetFileDataUrlResponse = {
    type: 'getFileDataUrl';
    fileDataUrl?: string;
    errorMessage?: string;
};
export declare const isGetFileDataUrlResponse: (x: any) => x is GetFileDataUrlResponse;
export type StoreFileRequest = {
    type: 'storeFile';
    fileData: string;
    uri?: string;
};
export declare const isStoreFileRequest: (x: any) => x is StoreFileRequest;
export type StoreFileResponse = {
    type: 'storeFile';
    uri?: string;
    error?: string;
};
export declare const isStoreFileResponse: (x: any) => x is StoreFileResponse;
export type StoreGithubFileRequest = {
    type: 'storeGithubFile';
    fileData: string;
    uri: string;
};
export declare const isStoreGithubFileRequest: (x: any) => x is StoreGithubFileRequest;
export type StoreGithubFileResponse = {
    type: 'storeGithubFile';
    success: boolean;
    error?: string;
};
export declare const isStoreGithubFileResponse: (x: any) => x is StoreGithubFileResponse;
export type SetUrlStateRequest = {
    type: 'setUrlState';
    state: {
        [key: string]: any;
    };
};
export declare const isSetUrlStateRequest: (x: any) => x is SetUrlStateRequest;
export type SetUrlStateResponse = {
    type: 'setUrlState';
};
export declare const isSetUrlStateResponse: (x: any) => x is SetUrlStateResponse;
export type ServiceQueryRequest = {
    type: 'serviceQuery';
    serviceName: string;
    query: any;
    includeUserId?: boolean;
};
export declare const isServiceQueryRequest: (x: any) => x is ServiceQueryRequest;
export type ServiceQueryResponse = {
    type: 'serviceQuery';
    result?: any;
    binaryPayload?: any;
    errorMessage?: string;
};
export declare const isServiceQueryResponse: (x: any) => x is ServiceQueryResponse;
export type ReadDirRequest = {
    type: 'readDir';
    uri: string;
};
export declare const isReadDirRequest: (x: any) => x is ReadDirRequest;
export type RDFile = {
    name: string;
    size: number;
    mtime: number;
};
export type RDDir = {
    name?: string;
    files: RDFile[];
    dirs: RDDir[];
};
export type ReadDirResponse = {
    type: 'readDir';
    dir?: RDDir;
    errorMessage?: string;
};
export declare const isReadDirResponse: (x: any) => x is ReadDirResponse;
export type FigurlRequest = GetFigureDataRequest | GetFileDataRequest | GetFileDataUrlRequest | StoreFileRequest | StoreGithubFileRequest | SetUrlStateRequest | ServiceQueryRequest | ReadDirRequest;
export declare const isFigurlRequest: (x: any) => x is FigurlRequest;
export type FigurlResponse = GetFigureDataResponse | GetFileDataResponse | GetFileDataUrlResponse | StoreFileResponse | StoreGithubFileResponse | SetUrlStateResponse | ServiceQueryResponse | ReadDirResponse;
export declare const isFigurlResponse: (x: any) => x is FigurlResponse;
