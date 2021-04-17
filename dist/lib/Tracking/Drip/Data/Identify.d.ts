import BaseData from './Base';
import CustomFieldsData from './CustomFields';
import StandardFieldsData from './StandardFields';
interface DripIdentifyData extends BaseData, StandardFieldsData, CustomFieldsData {
    email: string;
    eu_consent?: boolean;
    eu_consnet_message?: boolean;
    new_emai?: string;
    prospect?: boolean;
    remove_tags?: string[];
    tags?: string[];
    user_id?: string;
}
export default DripIdentifyData;
//# sourceMappingURL=Identify.d.ts.map