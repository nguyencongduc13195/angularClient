import { Component, OnInit } from '@angular/core';
import { BrandService } from './../../../shared/services/brand.service';
import { Brand } from './../../../shared/models/brand.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartService } from './../../../shared/services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../../shared/models/product.model';
@Component({
	selector: 'app-brand',
	templateUrl: './brand.component.html',
	styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

	constructor(
		private _router: Router,
		private _activated: ActivatedRoute,
		private _brandService: BrandService,
		private _cartService: CartService
	) { }
	public products: Product[] = [];
	private _sub: Subscription;
	public loaded: boolean = false;
	public loadedBrand: boolean = false;
	public brand: Brand = new Brand;
	ngOnInit(){
		this.loadData();
		this.loadBrand();
	}
	loadBrand(){
		this._sub = this._activated.params.subscribe((params: Params)=>{
			this._brandService.getOneBySlug(params['slug']).subscribe((data: Brand)=>{
				this.loadedBrand = false;
				if(data['success']){
					this.loadedBrand = true;
					this.brand = data['data']
				}
			})
		});
	}
	loadData(){
		this._sub = this._activated.params.subscribe((params: Params)=>{
			this._brandService.getProductByBrand(params['slug']).subscribe((data: Product[])=>{
				this.loaded = false;
				if(data['success']){
					this.loaded = true;
					this.products = data['data'];
				}
			})
		});
	}
	addToCart(item){
		this._cartService.addItem(item);
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}

}
