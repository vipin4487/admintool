import { Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";
import { businessunitComponent } from "./businessunit/businessunit.component";
import { ScreenPopComponent } from "./screenpop/screenpop.component";
//import { ManageScreenPopComponent } from "./screenpop/managescreenpop.component";
import { RegisterUserComponent } from "./user/registeruser.component";
import { AuthGuardService } from "./user/authGuard.service";
import { GetAllBusinessUnitResolve } from "./user/getAllBusinessUnitResolve.resolve";
import { UserComponent } from "./user/user.component";
import { environment } from '../environments/environment';
import { WweVagAgentComponent } from './wwe-vag-agent/wwe-vag-agent.component';

export const appRoutes: Routes = [
    {
        path: environment.baseRoute !== '' ? environment.baseRoute + '/businessunit' : 'businessunit', component: businessunitComponent,
        canActivate: [AuthGuardService]
        // path:'viewbusinessunit',component:ViewbusinessunitComponent
    },
    {
        path: environment.baseRoute !== '' ? environment.baseRoute : '', redirectTo: environment.baseRoute !== '' ? environment.baseRoute + '/welcome' : 'welcome', pathMatch: 'full'
    }
    ,

    {
        path: environment.baseRoute !== '' ? environment.baseRoute + '/welcome' : 'welcome', component: WelcomeComponent
    },
    {
        path: environment.baseRoute !== '' ? environment.baseRoute + '/user' : 'user', component: UserComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: environment.baseRoute !== '' ? environment.baseRoute + '/wwevagagent' : 'wwevagagent', component: WweVagAgentComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: environment.baseRoute !== '' ? environment.baseRoute + '/register' : 'register', component: RegisterUserComponent, resolve: { businessUnits: GetAllBusinessUnitResolve }
    },
    
    //      {
    // path : environment.baseRoute !== '' ? environment.baseRoute  +'/user' : 'user' ,component : UserComponent
    //        // path:'user',component:UserComponent
    //     },

    {
        path: environment.baseRoute !== '' ? environment.baseRoute + '/screenpop' : 'screenpop', component: ScreenPopComponent,
        canActivate: [AuthGuardService]
        // path:'viewbusinessunit',component:ViewbusinessunitComponent
    }
    //      {
    // path : environment.baseRoute !== '' ? environment.baseRoute  +'/managescreenpop' : 'managescreenpop' ,component : ManageScreenPopComponent,
    // canActivate: [AuthGuardService ]
    //        // path:'viewbusinessunit',component:ViewbusinessunitComponent
    //     }




    //console.log(appRoutes)
]