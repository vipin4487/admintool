import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';

// import {    DataTableModule,        } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/fileupload';
import { AppComponent } from './app.component';
import { WelcomeComponent } from "./welcome.component";
import { businessunitComponent } from "./businessunit/businessunit.component";
import { ScreenPopComponent } from "./screenpop/screenpop.component";
//import { ManageScreenPopComponent } from "./screenpop/managescreenpop.component";
import { NavComponent } from "./nav/nav.component";
import { appRoutes } from "./appRoutes";
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { UserFilterPipe } from './filter/user.pipe';
import { XmlPipe } from './filter/XmlPipe.pipe';
import { AuthService } from "./user/auth.service";
import { RegisterUserComponent } from "./user/registeruser.component";
import { AuthGuardService } from "./user/authGuard.service";
import { BusinessUnitService } from "./businessunit/businessunit.service";
import { ScreenPopService } from "./screenpop/screenpop.service";
import { GetAllBusinessUnitResolve } from "./user/getAllBusinessUnitResolve.resolve";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { WweVagAgentComponent } from './wwe-vag-agent/wwe-vag-agent.component';
import { WweVagAgentService } from './shared/services/wwe-vag-agent.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    businessunitComponent,
    ScreenPopComponent,
    NavComponent,
    UserComponent,
    UserFilterPipe,
    XmlPipe,
    RegisterUserComponent,
    WweVagAgentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes//{ enableTracing: true }
    ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    FileUploadModule,
    PanelModule,
    DropdownModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    ToggleButtonModule,
    TreeModule,
    
    BreadcrumbModule,
    ProgressSpinnerModule,
    TabMenuModule
  ],
  providers: [
    AuthService,
    { provide: APP_BASE_HREF, useValue: '/' },
    UserService,
    AuthGuardService,
    BusinessUnitService,
    ScreenPopService,
    GetAllBusinessUnitResolve,
    WweVagAgentService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  //console.log('kar');

}
