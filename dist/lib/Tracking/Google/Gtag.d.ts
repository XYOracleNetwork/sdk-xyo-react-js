declare class Gtag {
    updatePagePath(page_path: string): void;
    ga4id?: string;
    awid?: string;
    domains?: string[];
    gtag?: any;
    private constructor();
    static getInitialQuery(): string;
    static getInitialPage(): string;
    static getInitialReferrer(): string;
    static clearDataLayer(): void;
    static instance: Gtag;
    static init(ga4id: string, awid: string, domains?: string[]): Gtag;
    static reinit(ga4id: string, awid: string, domains?: string[]): Gtag;
    static updatePagePath(page_path: string): void;
    sendAnalytics(event: string, data: any): Promise<void>;
    sendAdwords(event: string, data: any): Promise<void>;
}
export default Gtag;
//# sourceMappingURL=Gtag.d.ts.map