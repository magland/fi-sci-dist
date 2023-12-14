declare const getFileData: (uri: string, onProgress: (a: {
    loaded: number;
    total: number;
}) => void, o?: {
    startByte?: number;
    endByte?: number;
    responseType?: string;
}) => Promise<any>;
export declare const getFileDataUrl: (uri: string) => Promise<string>;
export declare const storeFileData: (fileData: string, o?: {}) => Promise<string>;
export declare const storeGithubFileData: (o: {
    fileData: string;
    uri: string;
}) => Promise<void>;
export declare const handleFileDownloadProgress: (a: {
    uri: string;
    loaded: number;
    total: number;
}) => void;
export type Progress = {
    onProgress: (callback: (a: {
        loaded: number;
        total: number;
    }) => void) => void;
};
export declare const useFileData: (uri: string, o?: {
    startByte?: number;
    endByte?: number;
}) => {
    fileData: any;
    progress: Progress;
    errorMessage: string | undefined;
};
export default getFileData;
