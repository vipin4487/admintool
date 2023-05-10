import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { IUserLoginProfile } from "../model/user";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService{
    currentUser : IUserLoginProfile 
    baseurl:string = environment.api;
    private loginUrl = this.baseurl + 'api/WinAuth/GetUser';
    private logoutUrl = this.baseurl + 'api/WinAuth/LogoutUser';
    private headers : Headers;
    constructor(private http : HttpClient){

    }

    IsAuthenticated() : boolean{
        return !!this.currentUser;
    }

    login() : Observable<IUserLoginProfile>{
        console.log(this.loginUrl)
        return  this.http.get<IUserLoginProfile>(this.loginUrl,{ withCredentials: true})
        // .map((res : Response)=>{           
        //     this.currentUser = <IUserLoginProfile>res.json();
        //     console.log(this.currentUser)
        //     return <IUserLoginProfile>(res.json());
        // }).catch(this.handleError)
    }

    logout(): Observable<IUserLoginProfile>{
          return  this.http.get<IUserLoginProfile>(this.logoutUrl,{ withCredentials: true})
        //   .map((res : Response)=>{           
        //     this.currentUser = undefined;
        //     return res.json();
        // }).catch(this.handleError);
        
    }

     private handleError(err: Response) {        
        console.error(err);
        return Observable.throw(err.status);
    }
}