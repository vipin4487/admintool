import { Component, OnInit, ViewChild } from '@angular/core';
//import { BusinessUnitService } from './businessunit/businessunit.service';

import { IOmniAgentGroup} from "../model/businessUnit";
import { BusinessUnitService } from "./businessunit.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgIf } from '@angular/common';
import {  IUserLoginProfile } from '../model/user';

import { AuthService } from "../user/auth.service";
import { UserService } from "../user/user.service";
import { environment } from '../../environments/environment';


@Component({
    templateUrl: './businessunit.component.html',
     styles: [`
        .ui-grid-row div {
          padding: 4px 10pxl
        }
        
        .ui-grid-row div label {
          font-weight: bold;
        }  

    `]
})


export class businessunitComponent implements OnInit {
    first: number = 0;
    rows: number = 10;
    addAgentGroupDialog: boolean = false;
    errors :string;
   currentUser : IUserLoginProfile;
    searchValue:string = '';   
  
   DuplicateBU: number;
    agentDetails : IOmniAgentGroup[];
    agentDetail: IOmniAgentGroup = new PrimeAgentGroupDetails();    

       
    selectedRowIndex : number=0;
     
    UserAccessLevel : number = 0;
    currentBU : number = 0;
  
    BusinessUnit :number = 0;
   
    IsCCSDesktopGlobalAdmin :boolean;
    addButtonVisible : boolean = true;
    
    PageAccessLevel : number = 1;
    AgentRole : number = 2;
    agent_id:number = 0;
    
    EditHeader: string="Edit User";
    

    constructor(private _BusinessUnitService: BusinessUnitService,private authService : AuthService) { }
   


    ngOnInit(): void {
        
        this.currentUser = this.authService.currentUser;
        this.currentBU = this.currentUser.DefaultBU;
        this.UserAccessLevel = this.currentUser.MyUserInfo.UserAccessLevel;
        this.IsCCSDesktopGlobalAdmin = this.currentUser.MyUserInfo.IsCCSDesktopGlobalAdmin;
        this.agent_id = this.currentUser.MyUserInfo.UserId;
        
        this.LoadUsers();
    }

    paginate(event) {
        console.log('paginate of business unit component called')
        //this.LoadUsers(event.page);
    }
   businessUnitChangeEvent(message){
       console.log('businessUnitChangeEvent of business unit componenet called')
          this.LoadUsers(message.page);    
    }    
    LoadUsers(page = null): void { 

         if (this.UserAccessLevel <= this.PageAccessLevel && this.IsCCSDesktopGlobalAdmin)
                                    {
                                        this.addButtonVisible = true;

                                    }
                                    else
                                    {
                                        this.addButtonVisible = false;
                                    }

       this._BusinessUnitService.getAllOmniBusinessUnit().subscribe(res=>{
            this.agentDetails =  res;
             //this.addButtonVisible = true;
             this.addAgentGroupDialog = false;
             //this.addDialog = false;
        });
    }

 ShowAddDialog() {
              
        this.addAgentGroupDialog = true;
        this.agentDetail.OMNI_BU = '';
        this.errors = "";
    }

valuechange(newValue) {
  this.errors = "";
}
 

createAgentGroup(addUserForm: NgForm ){

     console.log("create Agent Group started");
        
         let formValues :any = addUserForm.value;
         console.log(addUserForm.value);
         //console.log("karthik");
        let agentDetail : IOmniAgentGroup = {
                                            
                                            OMNI_BU : formValues.OMNI_BU
                                        }
       
  
  this._BusinessUnitService.getOmniBUByName(agentDetail.OMNI_BU).subscribe((res)=>{
      console.log('Omni Api called');
      console.log(res);
            this.DuplicateBU = Number(res);
            if (this.DuplicateBU   == 0)
        {
        
        this._BusinessUnitService.post(environment.api +'api/OmniBusinessunit/AddAgentGroup',agentDetail).subscribe((res)=>{                       
                       
                        this.LoadUsers('');                        
                         this.addAgentGroupDialog = false;                       
        })
    }

    else
    {

        this.errors = "Agent Group Already exists";
    }
            
  });
        


//console.log("this.DuplicateBU"+ this.DuplicateBU);
  
  
}



    cancelAddDialog(){
        //this.errors = "";
      this.addAgentGroupDialog = false;
      
    }    

}

class PrimeAgentGroupDetails implements IOmniAgentGroup {
    
    constructor(        
        //public  AgentID?: number,      
        public  OMNI_BU? : string,
       
        ) {}
}
