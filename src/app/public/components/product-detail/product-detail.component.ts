import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { UserService } from './../../../shared/services/user.service';
import { Product } from './../../../shared/models/product.model';
import { Review } from './../../../shared/models/review.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	constructor(
		private _productService: ProductService,
		private _activatedRoute: ActivatedRoute,
		private _cartService: CartService,
		private _formBuilder: FormBuilder,
		private _userService: UserService
	) { }
	private _sub: Subscription;
	public loaded: boolean = false;
	public isChoice: number = 1;
	public isShowComment: boolean = true;
	public formComment: FormGroup;
	public reviews: Review[]= [];
	ngOnInit() {
		this.createFormComment();
		this.loadDetailProduct();
	}
	
	// 
	public full_name: string;
	public productDetail: Product;
	public relatedProduct: Product[] = [];
	loadDetailProduct(){
		this._sub = this._activatedRoute.params.subscribe((param: Params)=>{
			this._productService.getOne(param['slug']).subscribe((product)=>{
				if(product['success']){
					this.loaded = true;
					this._productService.getRelatedProduct(product['data']['_id']).subscribe((product)=>{
						if(product['success']){
							this.relatedProduct = product['data']
						}
					});
					if(localStorage.getItem('token')){
						this._sub = this._userService.information().subscribe((data)=>{
							if(data['success']){
								this.full_name = data['data']['full_name'];
								if(product['data']['likeBy'].indexOf(this.full_name)>-1){
									this.isLiked = true;
								}
								if(product['data']['dislikeBy'].indexOf(this.full_name)>-1){
									this.isDisliked = true;
								}
							}
						})
					}
					this.likes = product['data']['likes'];
					this.dislikes = product['data']['dislikes'];
					this.likeBy = product['data']['likeBy'];
					this.dislikeBy = product['data']['dislikeBy'];
					this.productDetail = product['data'];
					this.reviews = product['data']['reviews'];
					this.countReview();
				}
			});
		});
	}
	public fiveStar: number=0;
	public fourStar: number=0;
	public threeStar: number=0;
	public twoStar: number=0;
	public oneStar: number=0;
	public zeroStar: number=0;
	countReview(){
		this.reviews.map((value)=>{
			if(value.rating===5){
				this.fiveStar++;
			}else if(value.rating===4){
				this.fourStar++;
			}else if(value.rating===3){
				this.threeStar++;
			}
			else if(value.rating===2){
				this.twoStar++;
			}else if(value.rating===1){
				this.oneStar++;
			}
			else{
				this.zeroStar++;
			}
		})
	}
	// bình luận
	public txtComment: string = '';
	createFormComment(){
		this.formComment = this._formBuilder.group({
			'txtComment': ['',Validators.required],
		})
	}
	// rating
	public rates: number = 0;
	getRating(event){	
		this.rates = event;
	}
	onPostComment(value){
		if(!this._userService.loggedIn()){
			alert('Vui lòng đăng nhập để đóng góp ý kiến.');
		}else{
			this._sub = this._activatedRoute.params.subscribe((params: Params)=>{
				this._productService.getOne(params['slug']).subscribe((product: Product)=>{
					let review = new Review;
					review.comment = value.txtComment;
					review.rating = this.rates;
					this._productService.addReview(product['data']['_id'],review).subscribe((data: Review)=>{
						this.reviews.push(data['data']);
						this.txtComment = "";
						this.rates = 0;
					})
				});
			});
		}
	}
	// mua hàng
	addToCart(item, quantity){
		this._cartService.addItem(item, quantity);
	}
	// thích sản phẩm
	public likeBy: string[] = [];
	public isLiked: boolean = false;
	public likes: number = 0;
	likeProduct(id: string){
		if(!this._userService.loggedIn()){
			alert('Vui lòng đăng nhập');
		}else{
			this._sub = this._productService.likeProduct(id).subscribe((data)=>{
				this.isLiked = true;
				this.isDisliked = false;
				this.dislikes = data['data']['dislikes'];
				this.likes = data['data']['likes'];
				this.dislikeBy.splice(this.dislikeBy.indexOf(this.full_name),1)
				this.likeBy.push(this.full_name);
			});
		}
	}
	// không thích
	public dislikeBy: string[] = [];
	public isDisliked: boolean = false;
	public dislikes: number = 0;
	dislikeProduct(id: string){
		if(!this._userService.loggedIn()){
			alert('Vui lòng đăng nhập');
		}else{
			this._sub = this._productService.dislikeProduct(id).subscribe((data)=>{
				this.isLiked = false;
				this.isDisliked = true;
				this.dislikes = data['data']['dislikes'];
				this.likes = data['data']['likes'];
				this.likeBy.splice(this.likeBy.indexOf(this.full_name),1)
				this.dislikeBy.push(this.full_name);
			});
		}
	}
	// 
	@ViewChild('scroll') scroll: ElementRef;
	getData(event){
		this.scroll.nativeElement.scrollIntoView(); ;
	}
	// 
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
