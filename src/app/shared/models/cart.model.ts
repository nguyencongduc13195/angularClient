import { Product } from './product.model';
export class CartItem{
	constructor(public product: Product, public quantity: number = 1,public size, public color){

	}
	value(): number {
		if(this.product.promotion_price !== this.product.price){
			return this.product.promotion_price * this.quantity;
		}
		return this.product.price * this.quantity;
	}
}