import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './../models/product.model';
import { Review } from './../models/review.model';
import { AlertService } from './alert.service';

@Injectable()
export class ProductService {

	constructor(private _httpClient: HttpClient, private _alertService: AlertService) { }
	private api: string = "https://apimean.herokuapp.com/api/product";
	// private api: string = "http://localhost:3000/api/product";
	public getAll(pageIndex: number= 1, pageSize: number= 8) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/all?pageSize=${pageSize}&pageIndex=${pageIndex}`);
	}
	public getBestViews() : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/mostViews`);
	}
	public getMostLikesProducts() : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/mostLikes`);
	}
	public getNewestProduct() : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/newstProduct`);
	}
	public addProduct(product: Product) : Observable<Product>{
		return this._httpClient.post<Product>(`${this.api}/add`,{
			'txtName': product.name,
			'sltCategory': product.category,
			'sltBrand': product.brand,
			'txtBody': product.body,
			'txtDescription': product.description,
			'txtPrice': product.price,
			'txtUseArray': product.tag_array,
			'imageDetail': product.imageDetail,
			'txtImage': product.image,
			'txtColor': product.color,
			'txtSize': product.size,
			'txtGender': product.gender,
			'txtPromotionPrice': product.promotion_price || product.price,
			'txtStockItems': product.stockitems
		});
	}
	public updateProduct(id, product: Product) : Observable<Product>{
		return this._httpClient.put<Product>(`${this.api}/update/${id}`,{
			'txtName': product.name,
			'sltCategory': product.category,
			'sltBrand': product.brand,
			'txtBody': product.body,
			'txtDescription': product.description,
			'txtPrice': product.price,
			'txtPromotionPrice': product.promotion_price || product.price,
			'txtStockItems': product.stockitems,
			'txtColor': product.color,
		});
	}
	public deleteProduct(id) : Observable<Product>{
		return this._httpClient.delete<Product>(`${this.api}/delete/${id}`);
	}
	public getOne(slug: string) : Observable<Product>{
		return this._httpClient.get<Product>(`${this.api}/${slug}`);
	}
	public getOneById(id: string) : Observable<Product>{
		return this._httpClient.get<Product>(`${this.api}/find/${id}`);
	}
	public getRelatedProduct(id) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/related/${id}`);
	}
	public getDiffirentProduct(id) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/diffirent/${id}`);
	}
	public addReview(id: string, review: Review) : Observable<Review>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		return this._httpClient.post<Review>(`${this.api}/addreview/${id}`,{
			'txtComment': review.comment,
			'txtRating': review.rating
		},{headers});
	}
	public likeProduct(id: string) : Observable<Product>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		this._alertService.alert('Cám ơn bạn đã thích sản phẩm.');
		return this._httpClient.get<Product>(`${this.api}/like/${id}`,{headers});
	}
	public dislikeProduct(id: string) : Observable<Product>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		this._alertService.alert('Bạn không thích sản phẩm này.');
		return this._httpClient.get<Product>(`${this.api}/dislike/${id}`,{headers});
	}
	public updateBrand(id, newbrand) : Observable<Product>{
		return this._httpClient.get<Product>(`${this.api}/update-brand/${id}/${newbrand}`);	
	}
	public updateCate(id, newcate) : Observable<Product>{
		return this._httpClient.get<Product>(`${this.api}/update-cate/${id}/${newcate}`);	
	}
	public totalProduct() : Observable<any>{
		return this._httpClient.get<any>(`${this.api}/total-product`);
	}
	public searchItem(search) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/search/${search}`);
	}
	public getProductsByUse(slug) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findProducts/${slug}`);
	}
	public getProductsByGender(slug) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findProductsByGender/${slug}`);
	}
	public getProductsBySize(size) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findProductsBySize/${size}`);
	}
	public getProductsByColor(color) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findProductsByColor/${color}`);
	}
	public getProductsByColorAndSize(color, size) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findProductsByColorAndSize/?$color={color}&size=${size}`);
	}
	public getProductsByPrice(price) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findProductsByPrice/${price}`);
	}
}
