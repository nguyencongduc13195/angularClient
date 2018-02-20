import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
@Component({
	selector: 'app-tag',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {

	constructor(
		private _activated: ActivatedRoute,
		private _router: Router,
		private _productService: ProductService,
		private _cartService: CartService
	) { }

	ngOnInit() {
		this.loadProductsByUse();
	}
	public loaded: boolean = false;
	public products: Product[] = [];
	loadProductsByUse(){
		this._sub = this._activated.params.subscribe((params: Params)=>{
			this._productService.getProductsByUse(params['tag']).subscribe((data: Product[])=>{
				this.loaded = false;
				if(data['success']){
					this.useName = params['tag'];
					this.products = data['data'];
					this.loaded = true;
				}
			})
		})
	}
	addToCart(product){
		this._cartService.addItem(product, '1', product['size'][0], product['color'][0]);
	}
	public useName: string;
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}

}
