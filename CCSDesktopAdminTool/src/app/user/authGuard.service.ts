import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.IsAuthenticated()) {
      let url = environment.baseRoute !== '' ? environment.baseRoute  +'/welcome' : 'welcome'
      this.router.navigate([url]);
      return false;
    }
    return true;
  }
}