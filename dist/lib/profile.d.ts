interface ProfileResult {
    endTime: number;
    name: string;
    startTime: number;
}
export declare const enableProfileLogging: (enabled: boolean) => void;
export declare const profileResults: Array<ProfileResult>;
export declare const profileBlock: (name: string, closure: () => Promise<any>) => Promise<void>;
export {};
//# sourceMappingURL=profile.d.ts.map