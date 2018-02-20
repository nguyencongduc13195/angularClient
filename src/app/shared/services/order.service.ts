import { Injectable } from '@angular/core';
import { Order, OrderItem } from './../../shared/models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CartService } from './../services/cart.service';
@Injectable()
export class OrderService {
	private _api: string = 'https://apimean.herokuapp.com/api/order';
	// private _api: string = 'http://localhost:3000/api/order';
	constructor(private _httpClient: HttpClient, private _CartService: CartService) { }
	addOrder(order: Order, orderItem: OrderItem[]) : Observable<Order>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		return this._httpClient.post<Order>(`${this._api}/add`,{
			'txtName': order.name,
			'txtAddress': order.address,
			'txtPhone': order.phone,
			'rdoPayment': order.paymentOption,
			'txtNote': order.note,
			'txtQuantity': orderItem.map(item=>item.quantity),
			'txtSlug': orderItem.map(item=>item.slug),
			'txtColor': orderItem.map(item=>item.color),
			'txtTotal': this._CartService.total()
		},{headers});
	}
	myOrder() : Observable<Order[]>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		return this._httpClient.get<Order[]>(`${this._api}/myorder`,{headers});
	}
	all() : Observable<Order[]>{
		return this._httpClient.get<Order[]>(`${this._api}/all`);
	}
	one(id) : Observable<Order>{
		return this._httpClient.get<Order>(`${this._api}/find/${id}`);
	}
	updateConfirm(id) : Observable<Order>{
		return this._httpClient.get<Order>(`${this._api}/update-confirm/${id}`);
	}
	deleteOrder(id) : Observable<Order>{
		return this._httpClient.delete<Order>(`${this._api}/delete/${id}`);
	}
}
