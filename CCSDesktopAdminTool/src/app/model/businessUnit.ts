
import { FormControl } from '@angular/forms';

export interface IBusinessUnit {
    BusinessId: number,
    BusinessName: string
}
export interface IDuplicate {
    duplicate: number
    //Business_Unit_Nm: string
}

export interface IBusinessUnitList {
    Business_Unit_Id: number,
    Business_Unit_Nm: string
}

export interface IOmniAgentGroup {
    
    OMNI_BU?: string
}

export interface Validator<T extends FormControl> {
   (c:T): {[error: string]:any};
}