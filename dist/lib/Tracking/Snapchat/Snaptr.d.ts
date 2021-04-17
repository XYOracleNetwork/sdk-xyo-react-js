declare class SnapTr {
    pixelId?: string;
    userEmail?: string;
    snaptr?: any;
    private constructor();
    static instance: SnapTr;
    static init(pixelId: string): SnapTr;
    track(event: string, data?: any): Promise<void>;
}
export default SnapTr;
//# sourceMappingURL=Snaptr.d.ts.map