import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-diffirent-product',
	templateUrl: './diffirent-product.component.html',
	styleUrls: ['./diffirent-product.component.css']
})
export class DiffirentProductComponent implements OnInit, OnDestroy {
	@Output('view') connector = new EventEmitter<any>();
	constructor(
		private _productService: ProductService, 
		private _activatedRoute: ActivatedRoute, 
		private _router: Router
	) { }
	public diffirentProducts: Product[] = [];
	ngOnInit() {
		this._sub = this._activatedRoute.params.subscribe((params: Params)=>{
			this._productService.getOne(params['slug']).subscribe((product: Product)=>{
				this._productService.getDiffirentProduct(product['data']['_id']).subscribe((products: Product[])=>{
					if(products['success']){
						this.diffirentProducts = products['data'];
					}
				})
			})
		})
	}
	navigateToProduct(slug){
		this._router.navigate(['san-pham/',slug]);
		this.connector.emit();
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
