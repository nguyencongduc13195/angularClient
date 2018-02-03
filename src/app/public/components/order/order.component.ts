import { Component, OnInit } from '@angular/core';
import { CartService } from './../../../shared/services/cart.service';
import { OrderService } from './../../../shared/services/order.service';
import { CartItem } from './../../../shared/models/cart.model';
import { Order, OrderItem } from './../../../shared/models/order.model';
import { Router } from '@angular/router';
@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

	constructor(
		private _cartService: CartService, 
		private _router: Router,
		private _orderService: OrderService
	) { }

	ngOnInit() {
	}
	getData(event){
		if(event){
			this._router.navigate(['/']);
		}
	}
	getForm(event){
		let order: Order = new Order();
		order.name = event.txtName;
		order.address = event.txtAddress;
		order.phone = event.txtPhone;
		order.paymentOption = event.rdoPayment;
		order.note = event.txtNote;
		order.total = this._cartService.total();
		order.orderItems = this._cartService.items.map(
			(item:CartItem)=>new OrderItem(item.product.slug,item.quantity)
		);
		this._orderService.addOrder(order, order.orderItems).subscribe((data)=>{
			this._cartService.clear();
			alert(data['msg']);
			this._router.navigate(['/']);
		});
	}

}
