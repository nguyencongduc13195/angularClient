import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-related-product',
	templateUrl: './related-product.component.html',
	styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit, OnDestroy {
	@Output('view') connector = new EventEmitter<any>();
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _productService: ProductService,
		private _cartService: CartService
	) { }
	public relatedProduct: Product[] = [];
	ngOnInit() {
		this._sub = this._activatedRoute.params.subscribe((param: Params)=>{
			this._productService.getOne(param['slug']).subscribe((product: Product)=>{
				this._productService.getRelatedProduct(product['data']['_id']).subscribe((products: Product[])=>{
					if(products['success']){
						this.relatedProduct = products['data'];
					}
				})
			})
		})
	}
	// 
	private _sub: Subscription;
	onBuyItems(id, quantity){
		this._cartService.addItem(id,quantity);
	}
	navigateToProduct(slug){
		this._router.navigate(['san-pham',slug]);
		this.connector.emit();
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}

