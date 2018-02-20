import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
@Component({
	selector: 'app-gender',
	templateUrl: './gender.component.html',
	styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit, OnDestroy {

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
			this._productService.getProductsByGender(params['gender']).subscribe((data: Product[])=>{
				this.loaded = false;
				if(data['success']){
					console.log(data);
					this.useName = data['data'][0]['gender']['name'];
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
