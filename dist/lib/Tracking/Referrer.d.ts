declare class Referrer {
    private static storageId;
    local: string;
    session: string;
    constructor();
    private getFromLocal;
    private getFromSession;
    toJson(): {
        local: string;
        session: string;
    } | undefined;
}
export default Referrer;
//# sourceMappingURL=Referrer.d.ts.map