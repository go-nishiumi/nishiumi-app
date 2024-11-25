export interface population {
    year: number;
    value: number;
}

export interface graphData {
    year: number;
    [key: string]: number;
}

export interface prefectures {
    prefCode: number;
    prefName: string;
}

export interface prefecturesChkList {
    [key: number]: boolean;
}