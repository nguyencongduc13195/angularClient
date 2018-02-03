import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './../../../shared/services/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
import { Category } from './../../../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy{

	constructor(
		private _categoryService: CategoryService,
		private _cartService: CartService,
		private _activatedRoute: ActivatedRoute
	) { }
	private _sub: Subscription;
	public viewType: string = 'list';
	public loaded: boolean = false;
	public noItems: boolean = false;
	public msg: string;
	public products: Product[] = [];
	public categoryname: string;
	public totalItems: number = 0;
	ngOnInit() {
		this.loadNameCate();
		this.loadData();
	}
	loadData(){
		this._sub = this._activatedRoute.params.subscribe((params: Params)=>{
			this._categoryService.getProductByCategories(params['slug']).subscribe((data: Product[])=>{
				this.loaded = false;
				this.noItems = false;
				if(data['success']){
					this.totalItems = data['count'];
					this.loaded = true;
					this.products = data['data'];
				}else{
					this.totalItems = 0;
					this.noItems = true;
					this.msg = data['msg'];
				}
			})
		});
	}
	loadNameCate(){
		this._sub = this._activatedRoute.params.subscribe((params: Params)=>{
			this._categoryService.getCateBySlug(params['slug']).subscribe((cate: Category)=>{
				if(cate['success']){
					this.categoryname = cate['data']['name'];
				}
			})
		});
	}
	addToCart(item){
		this._cartService.addItem(item);
	}
	// 
	getSort(event){
		if(event==1){
			this.products = this.products.sort((a, b)=>{
				if(a.name > b.name) return 1;
				else if(a.name < b.name) return -1;
				else return 0;
			});
		}else if(event==2){
			this.products = this.products.sort((a, b)=>{
				if(a.name > b.name) return -1;
				else if(a.name < b.name) return 1;
				else return 0;
			});
		}else if(event==3){
			this.products = this.products.sort((a, b)=>{
				if(a.price > b.price) return -1;
				else if(a.price < b.price) return 1;
				else return 0;
			});
		}else{
			this.products = this.products.sort((a, b)=>{
				if(a.price > b.price) return 1;
				else if(a.price < b.price) return -1;
				else return 0;
			});
		}
	}
	getElement(event){
		switch (event) {
			case "1":
				this.loadData()
				break;
			
			default:
				// code...
				break;
		}
	}
	public productFilter: Product[] = [];
	public isFilter: boolean = false;
	getFilter(event){
		if(event!==""){
			this.isFilter = true;
			this.productFilter = this.products.filter((value)=>{
				return value.name.toLowerCase().indexOf(event.toLowerCase()) !== -1;
			});
		}else{
			this.isFilter = false;
			return this.products
		}
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
