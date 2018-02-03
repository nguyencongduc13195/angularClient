import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private _userService: UserService, private _router: Router){

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if(this._userService.loggedIn()){
    		this._router.navigate(['/']);
    		return false;
		}
		else{
			return true;
		}
  	}
}
