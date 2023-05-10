export interface IUser {
    Id: number,
    FirstName: string,
    LastName: string,
    Email: string,
    Gender: string,
    DOB: string,
    City: string,
    State: string,
    Zip: string,
    Country: string
}

export interface IUserLoginProfile {
    DefaultBU : number,
    ParentBuName : string,
    IsLogin : boolean,
    ChildCount : number,
    ParentBU : number,
    DefaultBUName : string,
    MyUserInfo : IUserInfo,
    Message : string
}

export interface IUserInfo {
   LoggedIn: boolean,
   UserName : string,
   UserId : number,
   UserAccessLevel : number,
   Status : string,
   IsAuntheticated : boolean,
   DomainId : string,
   UserRole : string,
   IsVCCDesktopGlobalAdmin  : boolean
   IsCCSDesktopGlobalAdmin :boolean
}


 export interface AgentDetails{
        AgentID? : number,
        AgentPhoneID? : number,
        AgentPhonePassword? : number,
        DomainId? : string,
        DomainName? : string,        
        CtiApplicationSettings? : string,
        LoggingTraceCode? : number,
        LogFileSize? : number,
        AccessFlag? : string,
        AgentRole? : number,
        Role? : string,
        BuId? : number,
        agent_login_status? : number,
        agent_last_login_dttm?: string,   
        userid? : number,
        applyall? : boolean,
        editButtonVisible? : boolean,
        viewButtonVisible? : boolean,
        addBuButtonVisible? : boolean,
        approveButtonVisible? : boolean,
        addButtonVisible? : boolean; 
    }

export interface usp_GetUserListForApprovalResult{
        agent_id  : number,
        agent_phone_id  : number,
         domain_nm  :string,
        domain_id :string,
        agent_login_status?  : number,
        agent_last_login_dttm? :string,
        CTI_appl_config_setting_txt:string,
        Access_flag :string,
        Agent_role :string

    }

    