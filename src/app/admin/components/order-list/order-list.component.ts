import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './../../../shared/services/order.service';
import { Order } from './../../../shared/models/order.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

	constructor(
		private _orderService: OrderService
	) { }
	public watchDetail:boolean=false;
	public orders: Order[] = [];
	ngOnInit() {
		this._sub = this._orderService.all().subscribe((data)=>{
			if(data['success']){
				this.orders = data['data']
			}
		});
	}
	public order: Order = new Order;
	goToDetailOrder(_id){
		this._sub = this._orderService.one(_id).subscribe((data)=>{
			if(data['success']){
				this.order = data['data'];
				this.watchDetail = true;
			}
		});
	}
	updateConfirm(_id){
		if(confirm('Thay đổi trạng thái đơn hàng?')){
			this._sub = this._orderService.updateConfirm(_id).subscribe((data)=>{
				if(data['success']){
					for (var i = 0; i < this.orders.length; i++) {
						if(this.orders[i]['_id'] === _id){
							this.orders[i]['confirm'] = !this.orders[i]['confirm'];
							break;
						}
					}
				}
			});
		}
	}
	public deleteSuccess: boolean=false;
	public msg: string;
	deleteOrder(_id){
		if(confirm('Bạn chắc chắn muốn xóa ?')){
			this._sub = this._orderService.deleteOrder(_id).subscribe((data)=>{
				if(data['success']){
					this.deleteSuccess = true;
					this.msg = data['msg'];
					for (var i = 0; i < this.orders.length; i++) {
						if(this.orders[i]['_id'] === _id){
							this.orders.splice(i,1);
							break;
						}
					}
					setTimeout(()=>{
						this.deleteSuccess=false;
						this.msg='';
					},1500);
				}
			})
		}
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
