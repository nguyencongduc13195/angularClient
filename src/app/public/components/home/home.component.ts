import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../../shared/models/product.model';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	constructor(private _productService: ProductService, private _cartService: CartService) { }
	public products: Product[] = [];
	private _sub: Subscription;
	public totalPage: number[] = [];
	public pageIndex: number = 0;
	public allPage: number = 0;
	public loadTotalPage: boolean = true;
	public loadAll: boolean = true;
	ngOnInit() {
		this._sub = this._productService.getAll().subscribe((data: Product[])=>{
			if(data['success']){
				this.products = data['data'];
				this.pageIndex = data['pageIndex'];
				this.allPage = data['totalPage'];
				this.totalPage = [];
				for (var i = 1; i <= data['totalPage']; i++) {
					this.totalPage.push(i);
				}
			}
		});
	}
	loadAllProducts(pageIndex: number = 1, pageSize: number = 8){
		this._sub = this._productService.getAll(pageIndex, pageSize).subscribe((data: Product[])=>{
			if(data['success']){
				this.products = data['data'];
				// this.pageIndex = data['pageIndex'];
				// this.allPage = data['totalPage'];
				// this.totalPage = [];
				// for (var i = 1; i <= data['totalPage']; i++) {
				// 	this.totalPage.push(i);
				// }
			}
		});
	}
	setPage(value){
		this.loadAllProducts(value, this.totalItemInPage);
	}
	// filter
	public isFilter: boolean = false;
	public filterName: string;
	public productsFilter: Product[] = [];
	onFilter(){
		if(this.filterName){
			this.isFilter = true;
			this.productsFilter = this.products.filter((value)=>{
				return value.name.toLowerCase().indexOf(this.filterName.toLowerCase()) !== -1;
			});
		}else{
			this.isFilter = false;
			return this.products;
		}
	}
	// sort
	selectSort(value){
		if(value == 1){
			this.products = this.products.sort((a,b)=>{
				if(a.name > b.name) return 1;
				else if(a.name < b.name) return -1;
				else return 0;
			});
		}
		else if(value == 2){
			this.products = this.products.sort((a,b)=>{
				if(a.name > b.name) return -1;
				else if(a.name < b.name) return 1;
				else return 0;
			});
		}
		else if(value==3){
			this.products = this.products.sort((a,b)=>{
				if(a.price > b.price) return 1;
				else if(a.price < b.price) return -1;
				else return 0;
			});
		}
		else if(value==4){
			this.products = this.products.sort((a,b)=>{
				if(a.price > b.price) return -1;
				else if(a.price < b.price) return 1;
				else return 0;
			});
		}
	}
	// display 
	public totalItemInPage: number;
	selectElement(e){
		switch (e) {
			case '1':
				this.loadAllProducts(1,10);
				this.totalItemInPage = 10;
				break;
			case '2':
				this.loadAllProducts(1,12);
				this.totalItemInPage = 12;
				break;
			default:
				this.loadAllProducts(1,8);
				break;
		}
	}
	// getData(event){
	// 	this.products = event;
	// }
	// active 
	public active: number = 1;
	getProduct(number: number){
		if(number==1){
			this.active = 1;
			this.loadAllProducts()
		}else if(number == 2){
			this.active = 2;
			this._sub = this._productService.getBestViews().subscribe((data: Product[])=>{
				if(data['success']){
					this.products = data['data']
				}
			});
		}else{
			this.active = 3;
			this._sub = this._productService.getMostLikesProducts().subscribe((data: Product[])=>{
				if(data['success']){
					this.products = data['data']
				}
			});
		}
	}
	// 
	addToCart(product){
		this._cartService.addItem(product);
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
