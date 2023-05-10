import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { AgentDetails, IUserLoginProfile } from '../model/user';
import { AuthService } from "../user/auth.service";
import { Router } from "@angular/router";
import { IBusinessUnitList, IBusinessUnit } from "../model/businessUnit";
import { BusinessUnitService } from "../businessunit/businessunit.service";
import { NgForm } from "@angular/forms";
import { environment } from '../../environments/environment';
import { UserResponse,AgentRoleList } from './user.model';
@Component({
    templateUrl: './user.component.html',
     styles: [`
        .ui-grid-row div {
          padding: 4px 10px
        }
        
        .ui-grid-row div label {
          font-weight: bold;
        }  

        em {float:right; color:#E05C65; padding-left:10px;}
        .error input {background-color:#E3C3C5;}
        .error ::-webkit-input-placeholder { color: #999; } 
        .error :-moz-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :ms-input-placeholder  { color: #999; }
        .panel-primary > .panel-heading {
        color: black;
        background-color: #9d9d9d;
        border-color: #337ab7;
        }

    `]
})
export class UserComponent implements OnInit {
    first: number = 0;
    rows: number = 10;
    addDialog: boolean;
    editDialog : boolean;
    isEditMode : boolean;
    addBUDialog:boolean;
    
    addAgentDetails: boolean;
    editAgentDetails: boolean;
    addBUAgentDetails: boolean;

    agentDetail: AgentDetails = new PrimeAgentDetails();    
    selectedRowIndex : number=0;
    agentDetails: AgentDetails[];    
    businessUnits : IBusinessUnitList[];
    BusinessUnit :number = 0;
    currentUser : IUserLoginProfile;
    UserAccessLevel : number = 0;
    currentBU : number = 0;

    addButtonVisible : boolean = true;
    
    PageAccessLevel : number = 2;
    CurrentRowAgentRole : number = 2;
    AgentRole : number = 2;
    agent_id:number = 0;
    EditHeader: string="Edit User";
    
    loginSuccess : boolean =false;
    message:string = "";

    ShowMessage:boolean = false;
    ShowMessageText :string ="";
    _AgentRoleList : AgentRoleList[];
    constructor(private _userService: UserService,private authService : AuthService, private route : Router,
    private businessUnitService : BusinessUnitService) { 

    }

    ngOnInit() {        
        this.currentUser = this.authService.currentUser;
        this.currentBU = this.currentUser.DefaultBU;
        this.UserAccessLevel = this.currentUser.MyUserInfo.UserAccessLevel;
        this.agent_id = this.currentUser.MyUserInfo.UserId;
    }

    paginate(event) {
        let pageNumber = event.page;
        this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,"");
    }

    businessUnitChangeEvent(message){
        console.log('businessUnitChangeEvent');
        let buID = message;
        this.currentBU = buID;

        this.authService.login().subscribe((res: IUserLoginProfile) => {
            if(res.Message == ""){
                if(res.MyUserInfo.IsAuntheticated){
                    this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,""); 
                    this.loginSuccess= true;
                }            
            }
            else{
                let url = environment.baseRoute !== '' ? environment.baseRoute  +'/welcome' : 'welcome';        
                this.route.navigate([url,{'userProfile':res}]);
                this.loginSuccess = false
                this.message = res.Message;
            }
        })

              
    }    

    GetUserList(accesslevel : number, agent_id : number,businessUnitID : number,  approvalStatus : number,  search_string : string,  flag : number,  startRowIndex : number,  pageSize : number,  sortExpression : string){
        // console.log('GetUserList Func');
        // console.log(this.UserAccessLevel);
        // console.log( this.PageAccessLevel);

        
        if (this.UserAccessLevel > this.PageAccessLevel)
        {
            this.addButtonVisible = false;

        }
        else
        {
            this.addButtonVisible = true;
        } 
        this._userService.getUsers(accesslevel,this.agent_id, this.currentBU ,3,"",1,0,0,"")
        .subscribe(agents => 
                        { 
                            this.agentDetails = agents; 
                            if (agents === undefined || agents === null || agents.length <=0)
                            {
                                    //create new agents permission are only for ent admin and bu admins
                                    if (this.UserAccessLevel > this.PageAccessLevel)
                                    {
                                        this.addButtonVisible = false;

                                    }
                                    else
                                    {
                                        this.addButtonVisible = true;
                                    }                                
                            }                            
                        });
    }    
    
    ShowAddDialog() {
        this.editAgentDetails = false;
        this.addBUAgentDetails = false;
        this.addAgentDetails = true;

        this.addBUDialog = false;
        this.editDialog = false;

        this.agentDetail = new PrimeAgentDetails();
        this.agentDetail.AgentRole = 2;
        this.BusinessUnit =this.currentBU;

        this.businessUnitService.getAllBusinessUnit().subscribe((res : IBusinessUnitList[])=>{
            this.businessUnits  =  res;
            this.BusinessUnit = 0;
        });        
        this.BusinessUnit = 0;
        //this.UserAccessLevel = 2;        
        this.addDialog = true;

        this._AgentRoleList =this._userService.GetAgentRolesforView(this.UserAccessLevel,"view",null);
    }

    cancelAddDialog(){
      this.addDialog = false;
    }

    ShowEditDialog(rowData,index,type){
        if(type == "View"){
            this.EditHeader = "View User";
            this.isEditMode = false;
        }else{
            this.EditHeader = "Edit User";
            this.isEditMode = true;
        }
        this.selectedRowIndex = index;
        this.addBUAgentDetails = false;
        this.addAgentDetails = false;
        this.editAgentDetails = true; 
        this.addBUDialog = false;
        this.addDialog = false;
        //console.log('rowData');
        //console.log(rowData);
        
        this.businessUnitService.getAllBusinessUnit().subscribe((res : IBusinessUnitList[])=>{
            this.businessUnits  =  res;
            this.BusinessUnit = this.currentBU;
        });

        this.agentDetail = this.cloneScreenPop(rowData);

        //console.log('this.agentDetail');
        //console.log(this.agentDetail);
        
        this.BusinessUnit = this.currentBU;
        //console.log('this.AgentRole');
        //console.log(this.agentDetail.AgentRole);
        //this.UserAccessLevel = this.agentDetail.AgentRole;
        this.editDialog = true;
        this.CurrentRowAgentRole =this.agentDetail.AgentRole;
        this._AgentRoleList =this._userService.GetAgentRolesforView(this.UserAccessLevel,"edit",this.agentDetail.AgentRole);        
    }

    cancelEdit(){
      this.editDialog = false;
    }    

    ShowAddBUDialog(rowData,index){
        this.selectedRowIndex = index;
        this.addDialog = false;
        this.editDialog = false; 

        this.addAgentDetails = false;
        this.editAgentDetails = false;   
        this.addBUAgentDetails = true;
        
        this.agentDetail = this.cloneScreenPop(rowData);
        this.businessUnitService.getAllBusinessUnit().subscribe((res)=>{
            this.businessUnits  =  res;
            this.BusinessUnit = 0;
        });
        
        this.BusinessUnit = 0;// this.currentBU;//this.agentDetail.BuId;
        //this.UserAccessLevel = this.agentDetail.AgentRole;
        this.addBUDialog = true;
        this.CurrentRowAgentRole =this.agentDetail.AgentRole;
        this._AgentRoleList =this._userService.GetAgentRolesforView(this.UserAccessLevel,"addbu",this.agentDetail.AgentRole);  
        //console.log(rowData);
    }  

    canceladdBUUser(){
        this.addBUDialog = false;
    }  

    createUser(form: NgForm ){
        //console.log('createUser');
        let formValues :any = form.value;
        let agentDetail : AgentDetails = {
                                            AgentID : 0,
                                            AccessFlag  :"P",
                                            DomainId : formValues.DomainId,
                                            DomainName : formValues.DomainName,
                                            AgentRole : formValues.AgentRole,
                                            BuId : formValues.BusinessUnit
                                        }
        
        this._userService.post('api/RegisterAgent',agentDetail).subscribe((res: UserResponse) =>{
                        console.log('res createUser');
                        console.log(res);
                        if(res.IsSuccess){
                            this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,"");

                            this.agentDetail = new PrimeAgentDetails(); 
                            
                            this.editAgentDetails = false;
                            this.addBUAgentDetails = false;
                            this.addAgentDetails = false;
                            
                            this.addDialog = false;
                            this.addBUDialog = false;
                            this.editDialog = false;
                            this.ShowMessage = true;
                            this.ShowMessageText = res.Message;
                        }else{
                            this.addDialog = true;
                            this.ShowMessage = true;
                            this.ShowMessageText = res.Message;
                        }
        })
    }

    cancelShowMessage(){
        this.ShowMessage = false;
        this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,"");
        this.agentDetail = new PrimeAgentDetails(); 
                            
        this.editAgentDetails = false;
        this.addBUAgentDetails = false;
        this.addAgentDetails = false;
        
        this.addDialog = false;
        this.addBUDialog = false;
        this.editDialog = false;
    }

    editUser(form: NgForm ){
        let formValues :any = form.value;
        let agentDetail : AgentDetails = {
                                            AgentID : this.agentDetail.AgentID,
                                            AccessFlag  :this.agentDetail.AccessFlag,
                                            DomainId : this.agentDetail.DomainId,
                                            DomainName : this.agentDetail.DomainName,
                                            AgentRole : formValues.AgentRole,
                                            BuId : formValues.BusinessUnit,
                                            applyall : false,
                                            userid :this.agentDetail.userid
                                        }
        this._userService.put('api/RegisterAgent',agentDetail.AgentID,agentDetail).subscribe((res : UserResponse)=>{
                    if(res.IsSuccess){
                        this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,""); 
                        this.agentDetail = new PrimeAgentDetails(); 
                        
                        this.editAgentDetails = false;
                        this.addBUAgentDetails = false;
                        this.addAgentDetails = false;
                        
                        this.addDialog = false;
                        this.addBUDialog = false;
                        this.editDialog = false;
                        this.ShowMessage = true;
                        this.ShowMessageText = res.Message;
                        }else{
                            this.editDialog = true;
                            this.ShowMessage = true;
                            this.ShowMessageText = res.Message;
                        }
        })
    }

    addBUUser(form: NgForm ){
        let formValues :any = form.value;
        let agentDetail : AgentDetails = {
                                            AgentID : this.agentDetail.AgentID,
                                            AccessFlag  :this.agentDetail.AccessFlag,
                                            DomainId : this.agentDetail.DomainId,
                                            DomainName : this.agentDetail.DomainName,
                                            AgentRole : formValues.AgentRole,
                                            BuId : formValues.BusinessUnit,
                                            applyall : false,
                                            userid :this.agentDetail.userid
                                        }
        
        this._userService.post('api/AgentBU',agentDetail).subscribe((res : UserResponse)=>{
                        if(res.IsSuccess){
                        this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,""); 
                        this.agentDetail = new PrimeAgentDetails(); 
                        
                        this.editAgentDetails = false;
                        this.addBUAgentDetails = false;
                        this.addAgentDetails = false;
                        
                        this.addDialog = false;
                        this.addBUDialog = false;
                        this.editDialog = false;
                        this.ShowMessage = true;
                        this.ShowMessageText = res.Message;
                        }else{
                            this.addBUDialog = true;
                            this.ShowMessage = true;
                            this.ShowMessageText = res.Message;
                        }
        })
    }
    
    Approve(rowData){
        this.agentDetail = this.cloneScreenPop(rowData);     
        let AgentDetailsUrl =   'api/AgentApproval';//+ '?agentid='+this.agentDetail.AgentID+'&business_unit_id=' + this.agentDetail.BuId +'&authorId=0'; 
        
        this._userService.post(AgentDetailsUrl,this.agentDetail).subscribe((res : UserResponse)=>{
                        if(res.IsSuccess){
                        this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,"");
                        this.agentDetail = new PrimeAgentDetails(); 
                        
                        this.editAgentDetails = false;
                        this.addBUAgentDetails = false;
                        this.addAgentDetails = false;
                        
                        this.addDialog = false;
                        this.addBUDialog = false;
                        this.editDialog = false;
                        this.ShowMessage = true;
                        this.ShowMessageText = res.Message;
                        }else{
                            this.ShowMessage = true;
                            this.ShowMessageText = res.Message;
                        }
        })
    } 
    
    cloneScreenPop(s: AgentDetails): AgentDetails {
        let agentDetail = new PrimeAgentDetails();
        for(let prop in s) {
            agentDetail[prop] = s[prop];
        }
        return agentDetail;
    }    

    logout(){
        this.authService.logout().subscribe((res: any) => {
              let url = environment.baseRoute !== '' ? environment.baseRoute  +'/welcome' : 'welcome';  
              this.route.navigate([url]);
        })
    }


   
}

class PrimeAgentDetails implements AgentDetails {
    
    constructor(        
        public  AgentID?: number,      
        public  DomainId? : string,
        public DomainName? : string, 
        public AccessFlag? : string,
        public AgentRole? : number,
        public BuId? : number ,
        public CtiApplicationSettings? : string,
        public LoggingTraceCode? : number, 
        public LogFileSize? : number,
        public AgentPhoneID? : number,
        public AgentPhonePassword? : number,
        ) {}
}