
export enum Classification {
    High = 'مرتفع',
    Normal = 'طبيعي',
    Low = 'منخفض',
    Unknown = 'غير معروف'
}

export interface BloodSugarReading {
    id: number;
    value: number;
    classification: Classification;
    advice: string;
    timestamp: string;
}

export interface ClassificationResult {
    classification: string;
    advice: string;
}
