import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { CartService } from './../../../shared/services/cart.service';
import { CartItem } from './../../../shared/models/cart.model';
@Component({
	selector: 'app-order-item',
	templateUrl: './order-item.component.html',
	styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit, DoCheck {

	constructor(private _cartService: CartService) { }
	@Output('clearItem') connector = new EventEmitter<any>();
	ngOnInit() {
		this.cartItem = this._cartService.items;
	}
	ngDoCheck(){
		this.totals = this._cartService.total();
	}
	public cartItem: CartItem[] = [];
	public totals = this._cartService.total() || 0;
	onDecreased(item: CartItem){
		this._cartService.decreaseQty(item);
		if(this._cartService.items.length <= 0 ){
			this.connector.emit(true);
		}
	}
	onIncreased(item: CartItem){
		this._cartService.increaseQty(item);
	}
	removeItem(item: CartItem){
		this._cartService.removeItem(item);
		if(this._cartService.items.length <= 0 ){
			this.connector.emit(true);
		}
	}
}
