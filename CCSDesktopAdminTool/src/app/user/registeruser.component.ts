import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IUser } from "./user.model";
import { SelectItem, MenuItem } from 'primeng/api';
import { BusinessUnitService } from "../businessunit/businessunit.service";
import { IBusinessUnit, IBusinessUnitList } from "../model/businessUnit";
import { IUserLoginProfile, AgentDetails } from "../model/user";
import { AuthService } from "../user/auth.service";
import { UserService } from "./user.service";
import { NgForm } from "@angular/forms";
import { environment } from '../../environments/environment';

@Component({
    templateUrl: './registeruser.component.html',
    styles: [`
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
export class RegisterUserComponent implements OnInit {


    businessUnits: IBusinessUnitList[];
    items: MenuItem[];
    currentUser: IUserLoginProfile;
    sub: any;
    component: any = this;

    checkMessage: boolean = false
    Message: string = ''
    IsSuccess: boolean = false;
    url:any = environment.baseRoute !== '' ? environment.baseRoute + '/welcome' : 'welcome'
    AgentRole: any = '';
    BusinessUnit: string = "";
    DomainId: string = "";
    DomainName: string = "";
    mouseoverLogin: boolean = false;
    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private route: Router,
        private businessUnitService: BusinessUnitService, private userService: UserService) {

    }

    cancel() {
         this.route.navigate([this.url]);
    }

    saveUser(form: NgForm) {
        let formValues: any = form.value;
        let agentDetail: AgentDetails = {
            AgentID: 0,
            AccessFlag: "P",
            DomainId: formValues.DomainId,
            DomainName: formValues.DomainName,
            AgentRole: formValues.AgentRole,
            BuId: formValues.BusinessUnit
        }

        this.userService.post('api/RegisterAgent', agentDetail).subscribe((res) => {
            this.checkMessage = true;
            this.Message = res.Message;
            this.IsSuccess = res.IsSuccess; 
            form.resetForm();
            if(this.IsSuccess)
            {
                console.log("Inside navigation block")
                this.route.navigate([this.url],{
                    queryParams: {'message':this.Message, 'isRegistered': true}
                });
            }
           
            this.SetToIntialState();
        })
    }

    SetToIntialState() {
        this.DomainId = "";
        this.DomainName = "";
        this.AgentRole = "";
        this.BusinessUnit = "";
    }

    ngOnInit() {
        this.businessUnits = this.activatedRoute.snapshot.data['businessUnits'];
    }

}


