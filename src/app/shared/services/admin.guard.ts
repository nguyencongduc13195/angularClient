import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private _userService: UserService, private _router: Router){

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if(this._userService.isAdmin){
			return true;
		}else{
			this._router.navigate(['/']);
			return false;
		}
	}
}
