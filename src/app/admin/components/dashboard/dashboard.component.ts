import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

	constructor(
		private _productService: ProductService
	) { }

	ngOnInit() {
		this.loadTotalProduct();
	}
	public isLoaded: boolean = false;
	public totalProduct: number = 0;
	public totalCate: number = 0;
	public totalBrand: number = 0;
	public totalUser: number = 0;
	public totalOrder: number = 0;
	loadTotalProduct(){
		this._sub = this._productService.totalProduct().subscribe((data)=>{
			if(data['success']){
				this.isLoaded = true;
				this.totalProduct = data['count_product'];
				this.totalCate = data['count_cate'];
				this.totalBrand = data['count_brand'];
				this.totalUser = data['count_user'];
				this.totalOrder = data['count_order'];
			}
		})
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
