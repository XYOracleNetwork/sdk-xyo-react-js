declare class Gtm {
    containerId?: string;
    private constructor();
    static getInitialQuery(): string;
    static clearDataLayer(): void;
    static instance: Gtm;
    static init(containerId: string): Gtm;
    send(event: string, data: any, eventTimeout?: number): Promise<void>;
}
export default Gtm;
//# sourceMappingURL=Gtm.d.ts.map