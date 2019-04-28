import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
      ) {}

      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.isAuthenticated()==null){
          return this.authService.isAuthenticatedPromise().then(res=>{
            if(!res){
              this.router.navigate(['external','login'], {
                queryParams: {
                  return: state.url
                }
              });
            }
            return res;
          });
        } else if (this.authService.isAuthenticated()) {
          return true;
        } else {
          console.log(state);

          this.router.navigate(['external','login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      }
    
}
