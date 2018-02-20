import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { AlertService } from './alert.service';

@Injectable()
export class CartService {
	public items: CartItem[] = [];
	public totalQty: number = 0;
	constructor(private _alertService: AlertService) { }
	public clear(){
		this.items = [];
		this.totalQty = 0;
	}	
	public addItem(item: Product, quantity='1',size, color){
		// let foundItem = this.items.find(
		// 	(fItem)=>fItem.product._id === item._id && parseInt(fItem.product.size) === size
		// );
		let foundItem = this.items.find(
			(fItem)=>(fItem.product._id === item._id && fItem.size === size && fItem.color === color)
		);
		if(foundItem){
			foundItem.quantity = foundItem.quantity + parseInt(quantity);
			// this.increaseQty(foundItem);
		}else{
			this.items.push(new CartItem(item, parseInt(quantity), size,color));
		}
		this.totalQty = this.totalQty + parseInt(quantity);
		this._alertService.alert(`Bạn vừa thêm sản phẩm ${item.name}`);
	}
	public removeItem(item: CartItem){
		this.items.splice(this.items.indexOf(item),1);
		this.totalQty = this.totalQty - item.quantity;
		this._alertService.alert(`Bạn vừa xóa sản phẩm ${item.product.name}`);
	}
	public total() : number{
		return this.items.map(item=>item.value()).reduce((pre,value)=>pre+value,0);
	}
	public increaseQty(item: CartItem){
		item.quantity = item.quantity + 1;
		this.totalQty = this.totalQty + 1;
	}
	public decreaseQty(item: CartItem){
		item.quantity = item.quantity - 1;
		this.totalQty = this.totalQty - 1;
		if(item.quantity === 0){
			this.removeItem(item);
		}
	}
}
