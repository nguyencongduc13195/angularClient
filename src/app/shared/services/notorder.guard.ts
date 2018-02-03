import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
@Injectable()
export class NotorderGuard implements CanActivate {
	constructor(private _cartService: CartService, private _router: Router){}
	canActivate() {
		if(this._cartService.items.length>0){
			return true;	
		}else{
			this._router.navigate(['/']);
		}
	}
}
