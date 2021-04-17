declare class Ttq {
    pixelId?: string;
    userEmail?: string;
    ttq?: any;
    libName: string;
    private constructor();
    static instance: Ttq;
    static init(pixelId: string): Ttq;
    page(): Promise<void>;
    track(event: string, data?: any): Promise<void>;
}
export default Ttq;
//# sourceMappingURL=Ttq.d.ts.map