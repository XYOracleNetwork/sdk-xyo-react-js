declare class UtmFields {
    private static localStorageId;
    fields: Record<string, string>[];
    constructor();
    getUtmRecord: () => Record<string, string> | null;
    update(): Record<string, string>[];
    toString(): string;
}
export default UtmFields;
//# sourceMappingURL=UtmFields.d.ts.map