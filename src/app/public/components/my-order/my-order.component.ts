import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../../shared/services/order.service';
import { Order, OrderItem } from './../../../shared/models/order.model';
@Component({
	selector: 'app-my-order',
	templateUrl: './my-order.component.html',
	styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

	constructor(private _orderService: OrderService) { }
	public orders: Order[] = [];
	ngOnInit() {
		this._orderService.myOrder().subscribe((data: Order[]) => {
			this.orders = data['data'];
		});
	}

}
