import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/Http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { AgentDetails, usp_GetUserListForApprovalResult } from '../model/user';
import { UserResponse , AgentRoleList} from './user.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class UserService {
    baseurl:string = environment.api;
   
    private AgentDetailsUrl =  this.baseurl + 'api/UserManagement/GetAgentListforApproval';
    constructor(private http: HttpClient) { }

    getUsers(accesslevel : number, agent_id : number,businessUnitID : number,  approvalStatus : number,  search_string : string,  flag : number,  startRowIndex : number,  pageSize : number,  sortExpression : string){            
        let _AgentDetailsUrl = this.AgentDetailsUrl;
       _AgentDetailsUrl =   _AgentDetailsUrl+ '?accesslevel='+accesslevel+'&agent_id=' + agent_id
       +'&businessUnitID='+businessUnitID+'&approvalStatus=' + approvalStatus
       +'&search_string=' + search_string+'&flag=' + flag+'&startRowIndex=' + startRowIndex+'&pageSize=' + pageSize
       +'&sortExpression=' + sortExpression + '';
       console.log('getUsers called');
       console.log(_AgentDetailsUrl);
            return  this.http.get<AgentDetails[]>( _AgentDetailsUrl,{ withCredentials: true})
            // .map((res)=>{     
            //     return <AgentDetails[]>(r);
            // }).catch(this.handleError)
        }

        
    get(url: string): Observable<any> {
        url = this.baseurl + url;
        return this.http.get(url,{ withCredentials: true})
            .map((response: Response) => <any>response.json());
    }

    post(url: string, model: any) {
        url = this.baseurl + url;
        let body = JSON.stringify(model);

        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        const options = {
            headers: headers,
            withCredentials: true
        };    
        return this.http.post<UserResponse>(url, body, options);
            // .map((response: Response) => {
            //     if(response !== null && response !== undefined){
            //         return  <UserResponse>(response.json());
            //     }
            // })
            // .catch(this.handleError);
    }

    put(url: string, id: number, model: any) {
        url = this.baseurl + url;
        let body = JSON.stringify(model);
         let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        const options = {
            headers: headers,
            withCredentials: true
        }; 
        return this.http.put(url, body, options)
            // .map((response: Response) => {
            //     //console.log('Puut');
            //     //console.log(response);
            //     if(response !== null && response !== undefined){
            //          return  <UserResponse>(response.json());
            //     }
            // })
            // .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        url = this.baseurl + url;
        return this.http.delete(url+id,{ withCredentials: true})
            .map((response: Response) => {
                if(response !== null && response !== undefined){
                    return  <any>response.json()
                }
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    GetAgentRoles() : AgentRoleList[]{
       let lstAgentRoleList : AgentRoleList[]  = [
                                                    {AgentRoleId :1,AgentRoleName : "Enterprise Admin"},
                                                    {AgentRoleId :2, AgentRoleName :"Business Unit Admin"},
                                                    {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                    {AgentRoleId :4, AgentRoleName :"Business User"},
                                                    {AgentRoleId :5, AgentRoleName :"Enterprise User"}
                                                ];
        return   lstAgentRoleList;
    }

    GetAgentRolesforView(UserAccessLevel :number,ViewType :string,currentEditedItemAgentRole? :number): AgentRoleList[]{
        if(ViewType == "view"){
            if (UserAccessLevel == 1)
            {
                return this.GetAgentRoles();
            }

            if (UserAccessLevel > 1) // if user logged in is not Ent Admin
            {
                //currentAgentRole  =  for user whose profile is being populated
                if (UserAccessLevel == 2)
                {

                     let lstAgentRoleList : AgentRoleList[]  = [
                                                        {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                        {AgentRoleId :4, AgentRoleName :"Business User"}
                                                ];
                    return   lstAgentRoleList;
                }
            }
        }
        else  if(ViewType == "edit"){
             if (UserAccessLevel == 1) // logged in user is Enterprise Admin
                        {
                            if ((currentEditedItemAgentRole != 1))
                            {
                                return this.GetAgentRoles();
                            }
                        }
                        else if (UserAccessLevel > 1) // if user logged in is not Ent Admin
                        {
                            //currentAgentRole  =  for user whose profile is being populated
                            if ((currentEditedItemAgentRole == 5) || (currentEditedItemAgentRole == 1) || (currentEditedItemAgentRole == 2))
                            {
                                   let lstAgentRoleList : AgentRoleList[]  = [
                                                    {AgentRoleId :1,AgentRoleName : "Enterprise Admin"},
                                                    {AgentRoleId :2, AgentRoleName :"Business Unit Admin"},
                                                    {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                    {AgentRoleId :4, AgentRoleName :"Business User"}
                                                ];
                                return lstAgentRoleList;
                            }
                            else
                            {
                                // for a bu user / suprvizr  remove ent user and bu admin profile
                                 let lstAgentRoleList : AgentRoleList[]  = [
                                                    {AgentRoleId :1,AgentRoleName : "Enterprise Admin"},
                                                    {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                    {AgentRoleId :4, AgentRoleName :"Business User"}
                                                ];
                                                 return lstAgentRoleList;
                            }
                        }
                        if (currentEditedItemAgentRole == 1)
                        {
                             return this.GetAgentRoles();
                        }
        }
        else if(ViewType == "addbu")
        {
                   
                        if (UserAccessLevel > 1) // if user logged in is not Ent Admin
                        {
                            //currentAgentRole  =  for user whose profile is being populated
                            if ((currentEditedItemAgentRole == 5) || (currentEditedItemAgentRole == 1) || (currentEditedItemAgentRole == 2))
                            {
                                  let lstAgentRoleList : AgentRoleList[]  = [
                                                    {AgentRoleId :1,AgentRoleName : "Enterprise Admin"},
                                                    {AgentRoleId :2, AgentRoleName :"Business Unit Admin"},
                                                    {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                    {AgentRoleId :4, AgentRoleName :"Business User"}
                                                ];
                                return lstAgentRoleList;
                            }
                            else
                            {
                                // for a bu user / suprvizr  remove ent user and bu admin profile
                                   let lstAgentRoleList : AgentRoleList[]  = [
                                                    {AgentRoleId :1,AgentRoleName : "Enterprise Admin"},
                                                    {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                    {AgentRoleId :4, AgentRoleName :"Business User"}
                                                ];
                                                 return lstAgentRoleList;
                            }
                        }
                        if (currentEditedItemAgentRole == 1)
                        { 
                            return this.GetAgentRoles();
                        }
                    

                    if (UserAccessLevel > 1) // if user logged in is not Ent Admin
                    {
                         let lstAgentRoleList : AgentRoleList[]  = [
                                                    {AgentRoleId :1,AgentRoleName : "Enterprise Admin"},
                                                    {AgentRoleId :2, AgentRoleName :"Business Unit Admin"},
                                                    {AgentRoleId :3, AgentRoleName :"Business Supervisor"},
                                                    {AgentRoleId :5, AgentRoleName :"Enterprise User"}
                                                ];
                            return   lstAgentRoleList;
                    }
        }
        // return this.GetAgentRoles();
    }
}


