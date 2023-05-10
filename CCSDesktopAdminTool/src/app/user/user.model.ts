export interface IUser{
    Id: number,
    UserName : string,
    IsAuthenticated : boolean,
    DomainId : string,
    DomainName :string,
    BusinessUnit :string,
    AgentRole :string[],
    Access_Flag:string
}

export interface UserResponse{
         Message :string,
         IsSuccess :boolean
}

export interface AgentRoleList{
        AgentRoleId: number,
        AgentRoleName : string
}