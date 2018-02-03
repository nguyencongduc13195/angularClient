import { Component,Input, OnChanges, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductService } from './../../../shared/services/product.service';
import { Product } from './../../../shared/models/product.model';
import { CartService } from './../../../shared/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from './../../../shared/services/category.service';
import { BrandService } from './../../../shared/services/brand.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, OnChanges {
	@Input('search') productsSearch: Product[];
	constructor(
		private _productService: ProductService,
		private _activatedRoute: ActivatedRoute,
		private _cartService: CartService,
		private _categoryService: CategoryService,
		private _brandService: BrandService
	) { }
	private _sub: Subscription;
	public loaded: boolean = false;
	public products: Product[] = [];
	ngOnInit() {
		this.loadAllProducts(1);
	}
	onLoadProducts(){
		this.loadAllProducts(1,6)
	}
	public isSearch: boolean = false;
	ngOnChanges(){
		this.products = this.productsSearch;
		this.loadAll = false;
		this.isSearch = true;
	}
	// 
	public totalPage: number[] = [];
	public pageIndex: number = 0;
	public allPage: number = 0;
	public loadTotalPage: boolean = true;
	public loadAll: boolean = true;
	loadAllProducts(pageIndex: number = 1, pageSize: number =6){
		this._sub = this._productService.getAll(pageIndex, pageSize).subscribe((data: Product[])=>{
			this.loaded = false;
			if(data['success']){
				this.loaded = true;
				this.loadAll = true;
				this.products =  data['data'];
				this.pageIndex = data['pageIndex'];
				this.allPage = data['totalPage'];
				this.totalPage = [];
				for (var i = 1; i <= data['totalPage']; i++) {
					this.totalPage.push(i);
				}
			}
		});
	}
	// loadPage
	public totalItemInPage: number = 6;
	setPage(value){
		this.loadAllProducts(value, this.totalItemInPage);
	}
	// filter
	public isFilter: boolean = false;
	public filterName: string= '';
	public productFilter: Product[] = [];
	onFilter(){
		if(this.filterName.length !== 0){
			this.isFilter = true;
			this.productFilter = this.products.filter((value)=>{
				return value.name.toLowerCase().indexOf(this.filterName.toLowerCase()) !=-1;
			});
		}
		else{
			this.isFilter = false;
			return this.products;
		}
	}
	// sắp xếp
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
	// hiển thị
	selectElement(e){
		switch (e) {
			case '1':
				this.loadAllProducts(1,3);
				this.totalItemInPage = 3;
				break;
			case '2':
				this.loadAllProducts(1,5);
				this.totalItemInPage = 5;
				break;
			case '3':
				this.loadAllProducts(1,7);
				this.totalItemInPage = 7;
				break;
			default:
				this.loadAllProducts(1,6);
				break;
		}
	}
	// 
	addToCart(item){
		this._cartService.addItem(item);
	}
	// 
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
