import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from './../../../shared/services/alert.service';
@Component({
	selector: 'admin-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

	public isSelected: number = 0;
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _alertService: AlertService
	) { }

	ngOnInit() {
		// this._sub = this._activatedRoute.url.subscribe((params)=>{
		// 	params.forEach((value)=>{
		// 		console.log(value);
		// 	})
		// })
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
