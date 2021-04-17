declare class Fbq {
    pixelId?: string;
    fbq?: any;
    private constructor();
    static instance: Fbq;
    static init(pixelId: string): Fbq;
    track(event: string, data: any): Promise<void>;
    trackCustom(event: string, data: any): Promise<void>;
}
export default Fbq;
//# sourceMappingURL=Fbq.d.ts.map