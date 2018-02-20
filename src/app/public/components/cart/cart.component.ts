import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CartItem } from './../../../shared/models/cart.model';
import { CartService } from './../../../shared/services/cart.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
	
	constructor(
		private _cartService: CartService, 
	) { }

	ngOnInit() {
	}
	public cartItems: CartItem[] = [];

	// 
	@Input('showCart') isShowCart;
	ngOnChanges(){
		this.cartItems = this._cartService.items;
	}
	@Output('closeCart') connector = new EventEmitter<any>();
	closeCart(){
		this.connector.emit();
	}
}
