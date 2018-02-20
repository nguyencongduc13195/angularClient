import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../../shared/models/product.model';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	constructor(
		private _productService: ProductService, 
		private _cartService: CartService,
		private _activated: ActivatedRoute) { }
	public products: Product[] = [];
	public productsSearch: Product[] = [];
	private _sub: Subscription;
	public isSearching: boolean = false;
	public msg: string;
	ngOnInit() {
		this._sub = this._activated.queryParams.subscribe((params)=>{
			if(params['key']){
				this._productService.searchItem(params['key']).subscribe((data)=>{
					this.productsSearch = [];
					if(data['success']){
						this.isSearching = true;
						this.productsSearch = data['data']
					}else{
						this.isSearching = true;
						this.msg = data['msg'];
					}
				})
			}else{
				this.loadAllProducts();
			}
		})
	}
	loadAllProducts(){
		this._sub = this._productService.getAll().subscribe((data: Product[])=>{
			if(data['success']){
				this.isSearching = false;
				this.products = data['data'];
			}
		});
	}
	// search
	loadSearch(){
		this._sub = this._activated.queryParams.subscribe((params)=>{
			this._productService.searchItem(params['key']).subscribe((data)=>{
				if(data['success']){
					this.products = data['data']
				}
			})
		})
	}
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
		// this._cartService.addItem(product);
		this._cartService.addItem(product,'1',product.size[0],product.color[0]);
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
