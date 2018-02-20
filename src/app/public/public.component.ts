import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}
	public isShowCart: boolean = false;
	getShowCart(event){
		if(event === undefined){
			this.isShowCart = true;
		}
	}
	getCloseCart(event){
		if(event === undefined){
			this.isShowCart = false;
		}
	}
}
