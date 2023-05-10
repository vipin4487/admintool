import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IUserLoginProfile } from "./model/user";
import { AuthService } from "./user/auth.service";
import { environment } from '../environments/environment';

@Component({
    templateUrl: "./welcome.component.html"
})
export class WelcomeComponent implements OnInit {
    loginSuccess: boolean = false;
    message: string = "";
    userProfile: IUserLoginProfile;

    isRegistered: boolean = false;
    registerMessage: string = '';

    RouterUrlRegister = environment.baseRoute !== '' ? '/' + environment.baseRoute + '/register' : '/register';
    constructor(private authService: AuthService, private route: Router, private activatedroute: ActivatedRoute) {

    }

    ngOnInit() {
        if (this.activatedroute.snapshot.queryParamMap.has("isRegistered"))
         {
            this.isRegistered = this.activatedroute.snapshot.queryParamMap.get("isRegistered") == "true"
            if (this.isRegistered) {
                this.registerMessage = this.activatedroute.snapshot.queryParamMap.get("message")
                console.log(this.registerMessage)
            }
        }
    }

    login() {
        console.log('Login on welcome component called');
        this.isRegistered = false;
        this.authService.login().subscribe((res: IUserLoginProfile) => {
            if (res != null) {
                if (res.Message == "") {
                    console.log(res.MyUserInfo.IsAuntheticated);
                    if (res.MyUserInfo.IsAuntheticated) {
                        this.authService.currentUser = res;
                        let url = environment.baseRoute !== '' ? environment.baseRoute + '/user' : 'user';
                        console.log(url);
                        this.route.navigate([url, { 'userProfile': res }]);
                        this.loginSuccess = true;
                    }
                }
                else {
                    this.loginSuccess = false;
                    this.message = res.Message;
                    console.log(this.message)
                }
            }
        }, error => {
            console.log(error);
        })
    }
}