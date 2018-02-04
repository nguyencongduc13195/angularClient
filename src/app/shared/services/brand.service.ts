import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Brand } from './../models/brand.model';
import { Product } from './../models/product.model';
@Injectable()
export class BrandService {

	constructor(private _httpClient: HttpClient) { }
	private _api: string = 'https://apimean.herokuapp.com/api/brand';
	// private _api: string = 'http://localhost:3000/api/brand';
	public getAll() : Observable<Brand[]>{
		return this._httpClient.get<Brand[]>(`${this._api}/all`);
	}
	public addBrand(brand: Brand) : Observable<Brand>{
		return this._httpClient.post<Brand>(`${this._api}/add`,{
			'txtName': brand.name,
			'txtDescription': brand.description,
			'txtImage': brand.image
		});
	}
	public getProductByBrand(slug: string) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this._api}/brands/${slug}`);
	}
	public getOne(id) : Observable<Brand>{
		return this._httpClient.get<Brand>(`${this._api}/find/${id}`);
	}
	public getOneBySlug(slug) : Observable<Brand>{
		return this._httpClient.get<Brand>(`${this._api}/findOne/${slug}`);
	}
	public deleteBrand(id) : Observable<Brand>{
		return this._httpClient.delete<Brand>(`${this._api}/delete/${id}`)
	}
	public updateBrand(id, brand: Brand) : Observable<Brand>{
		return this._httpClient.put<Brand>(`${this._api}/update/${id}`,{
			'txtName': brand.name,
			'txtDescription': brand.description,
			'txtImage': brand.image
		});
	}
	public booksOfBrand(id) : Observable<any>{
		return this._httpClient.get<any>(`${this._api}/booksOfBrand/${id}`);
	}
}
