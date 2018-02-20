import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product.model';
import { Category } from './../models/category.model';
@Injectable()
export class CategoryService {

	constructor(private _httpClient: HttpClient) { }
	private api: string = "https://apimean.herokuapp.com/api/category";
	// private api: string = "http://localhost:3000/api/category";
	public getAllCategories() : Observable<Category[]>{
		return this._httpClient.get<Category[]>(`${this.api}/all`);
	}
	public getCateBySlug(slug) : Observable<Category>{
		return this._httpClient.get<Category>(`${this.api}/findSlug/${slug}`);
	}
	public getProductByCategories(slug: string, pageIndex: number = 1, pageSize: number = 4) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/${slug}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
	}
	public uploadImage(event): Observable<any>{
		let fileList: FileList = event.nativeElement.files;
		// let fileList: FileList = event.target.files;
	   	if(fileList.length > 0) {
	    let file: File = fileList[0];
	    let formData:FormData = new FormData();
	    formData.append('txtImage', file, file.name);
		return this._httpClient.post(`${this.api}/uploadimage`, formData);
		}
	}
	public deleteImage(nameImage): Observable<any>{
		return this._httpClient.get<any>(`${this.api}/delete-image/${nameImage}`);
	}
	public addCate(cate: Category) : Observable<Category>{
		return this._httpClient.post<Category>(`${this.api}/add`, {
			'txtName': cate.name,
			'txtDescription': cate.description,
			'txtImage': cate.image
		});
	}
	public updateCate(cate: Category, id) : Observable<Category>{
		return this._httpClient.put<Category>(`${this.api}/update/${id}`, {
			'txtName': cate.name,
			'txtDescription': cate.description
		});
	}
	public deleteCate(id: string) : Observable<Category>{
		return this._httpClient.delete<Category>(`${this.api}/delete/${id}`);
	}
	public getOne(id: string) : Observable<Category>{
		return this._httpClient.get<Category>(`${this.api}/find/${id}`);
	}
	public booksOfCate(id) : Observable<any>{
		return this._httpClient.get<any>(`${this.api}/booksOfCate/${id}`);
	}
}
