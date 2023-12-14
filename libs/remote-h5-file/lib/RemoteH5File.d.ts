import { Canceler } from './helpers';
export type RemoteH5FileX = RemoteH5File | MergedRemoteH5File;
export type RemoteH5Group = {
    path: string;
    subgroups: RemoteH5Subgroup[];
    datasets: RemoteH5Subdataset[];
    attrs: {
        [key: string]: any;
    };
};
export type RemoteH5Subgroup = {
    name: string;
    path: string;
    attrs: {
        [key: string]: any;
    };
};
export type RemoteH5Subdataset = {
    name: string;
    path: string;
    shape: number[];
    dtype: string;
    attrs: {
        [key: string]: any;
    };
};
export type RemoteH5Dataset = {
    name: string;
    path: string;
    shape: number[];
    dtype: string;
    attrs: {
        [key: string]: any;
    };
};
export type DatasetDataType = Float32Array | Float64Array | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;
export declare const globalRemoteH5FileStats: {
    getGroupCount: number;
    getDatasetCount: number;
    getDatasetDataCount: number;
    numPendingRequests: number;
};
export declare class RemoteH5File {
    #private;
    url: string;
    private metaUrl;
    constructor(url: string, metaUrl: string | undefined);
    get dataIsRemote(): boolean;
    getGroup(path: string): Promise<RemoteH5Group | undefined>;
    getDataset(path: string): Promise<RemoteH5Dataset | undefined>;
    getDatasetData(path: string, o: {
        slice?: [number, number][];
        allowBigInt?: boolean;
        canceler?: Canceler;
    }): Promise<DatasetDataType | undefined>;
}
export declare class MergedRemoteH5File {
    #private;
    constructor(files: RemoteH5File[]);
    get dataIsRemote(): boolean;
    getGroup(path: string): Promise<RemoteH5Group | undefined>;
    getDataset(path: string): Promise<RemoteH5Dataset | undefined>;
    getDatasetData(path: string, o: {
        slice?: [number, number][];
        allowBigInt?: boolean;
        canceler?: Canceler;
    }): Promise<DatasetDataType | undefined>;
    getFiles(): RemoteH5File[];
}
export declare const getRemoteH5File: (url: string, metaUrl: string | undefined) => Promise<RemoteH5File>;
export declare const getMergedRemoteH5File: (urls: string[], metaUrls: (string | undefined)[]) => Promise<RemoteH5File | MergedRemoteH5File>;
