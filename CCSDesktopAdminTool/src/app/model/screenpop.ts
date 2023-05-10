
export interface IScreenPop {
    businessUnitDisplayID? :number,
    business_unit_id?:number,
    DisplayTag? : string,
    DisplayType?: string,
    CallEventName?:string,    
    Group? : number,
    Priority? : number,
    Active?:number,
    IsActive?:boolean,
    ScreenpopHeader? :string,
    display_header?:string,
    display_subheader?:string,
    Screenpopxoml? :string,
    CallEventID? : number,
    Display_type_id? : number,
    data_source_command_txt?: string,
    data_source_connection_txt?: string,
    data_source_command_input_txt ?: string,
    URL_display_address_txt ?: string,
    xslt_transform_file_reply ?: string,
    xslt_transform_file ?: string,
    Greetings ?: string,
    author_id ?: number
    
}

export interface ICen {
  name?: string;
}

export interface IKeyValue
{
    value?:number,
    label?:string
}
export interface IScreenPopCriteria
    {
        BusinessUnitDisplayValueMapID?:number,
        businessUnitDisplayID? :number,
          Index ?: string,
          valueTypeText ?:string,
          ValueText? : string,
          Conditional :IKeyValue,
          SourceType? : IKeyValue,
          Operator?:IKeyValue


    }

// export interface Car {
//     vin?;
//     year?;
//     brand?;
//     color?;
//     price?;
//     saleDate?;
// }



