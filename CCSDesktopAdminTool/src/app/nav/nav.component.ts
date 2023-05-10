import { Component, OnInit, Output, Input, EventEmitter} from "@angular/core";
import { AuthService } from "../user/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SelectItem, MenuItem } from 'primeng/api';
import { BusinessUnitService } from "../businessunit/businessunit.service";
import { IBusinessUnit } from "../model/businessUnit";
import { IUserLoginProfile } from "../model/user";
import { environment } from '../../environments/environment';

@Component({
    selector : 'nav-menu',
    templateUrl : './nav.component.html',
    styles : [
        `
        li > a.active {color : red;}
        a:hover {cursor:pointer;}
        `
            ]
})
export class NavComponent  implements OnInit  {
    businessUnits : IBusinessUnit[];
    //businessUnits : SelectItem[];
    //selectedBusinessUnit : number;
    items: MenuItem[];
    activeItem: MenuItem = null;
    currentUser : IUserLoginProfile;
    sub : any;
    authService : AuthService
    _selectedBusinessUnit: number;
    get selectedBusinessUnit(): number {
        return this._selectedBusinessUnit;
    }

    @Input('selectedBusinessUnit')
    set selectedBusinessUnit(value: number) {
        this._selectedBusinessUnit = value;
        //console.log('Event Emitted');
        this.emitEvent.next(this._selectedBusinessUnit);
    }

    @Output() 
    emitEvent = new EventEmitter();

    constructor(private activatedRoute: ActivatedRoute, private _authService : AuthService, private route : Router, private businessUnitService : BusinessUnitService){
        this.authService = _authService;
    }

    logout(){
        let url = environment.baseRoute !== '' ? environment.baseRoute  +'/welcome' : 'welcome'
        this.authService.logout().subscribe((res: any) => {
              this.route.navigate([url]);
        })
    }

    ngOnInit() {
        let agentId : number;
        let wwevagagent = environment.baseRoute !== '' ? '/'+ environment.baseRoute  +'/wwevagagent' : '/wwevagagent';
        let urlbu = environment.baseRoute !== '' ? '/'+ environment.baseRoute  +'/businessunit' : '/businessunit';
        let urlviewScreenpop = environment.baseRoute !== '' ? '/'+ environment.baseRoute  +'/screenpop' : '/screenpop';
        let urluser = environment.baseRoute !== '' ? '/'+ environment.baseRoute  +'/user' : '/user';
        let urlmanagescreenpop = environment.baseRoute !== '' ? '/'+ environment.baseRoute  +'/managescreenpop' : '/managescreenpop';
        console.log(urlbu);
        console.log(urlviewScreenpop);
        console.log(urluser);
        
        
        this.items  = [
            {
                label: 'AgentGroups', routerLink: urlbu.toString(),icon: 'pi pi-fw pi-users'
            },
            {
                label: 'VAG Agent List', routerLink: wwevagagent.toString(),icon: 'pi pi-fw pi-sitemap'
            },
            {
                label: 'User Management',routerLink: urluser.toString(),icon: 'pi pi-fw pi-users'
            },
             {
                label: 'Screenpops',routerLink:urlviewScreenpop.toString(),icon: 'pi pi-fw pi-id-card'
            }
            // {
            //     label: 'ManageScreenPops',routerLink:urlmanagescreenpop.toString()
            // }
        ];
        this.activeItem = this.items.find(f => f.routerLink=== this.route.url);
        console.log(this.activeItem);
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.currentUser = params['userProfile']; // (+) converts string 'id' to a number
            
            console.log(this.currentUser);
            //console.log('currentUser'+this.currentUser+'this.currentUser.DefaultBU'+ this.currentUser.DefaultBU+'this.agent_id'+ this.agent_id);
        });
        
        if(this.authService.currentUser)
        {
            console.log('inside if loop of nav');
            if(this.authService.currentUser.MyUserInfo !== undefined){
               agentId = this.authService.currentUser.MyUserInfo.UserId;
               this.selectedBusinessUnit = this.authService.currentUser.DefaultBU;
             
               this.businessUnitService.getBusinessUnit(agentId).then((res: IBusinessUnit[]) => {
                    this.businessUnits  =  res;                
                });
            }
        }
    }


    private ngOnDestroy() {
        this.sub.unsubscribe();
    }
    activeMenu(event) {
        
        let node;
        if (event.target.classList.contains("p-submenu-header") == true) {
          node = "submenu";
        } else if (event.target.tagName === "SPAN") {
          node = event.target.parentNode.parentNode;
        } else {
          node = event.target.parentNode;
        }
        //console.log(node);
        if (node != "submenu") {
          let menuitem = document.getElementsByClassName("p-menuitem");
          for (let i = 0; i < menuitem.length; i++) {
            menuitem[i].classList.remove("active");
          }
          node.classList.add("active");
        }
      }
}
