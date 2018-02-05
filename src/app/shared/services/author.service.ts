import { Injectable } from '@angular/core';
import { Author } from './../models/author.model';
import { Product } from './../models/product.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthorService {
	// private api: string = 'http://localhost:3000/api/author';
	private api: string = 'https://apimean.herokuapp.com/api/author';
	constructor(private _httpClient: HttpClient) { }
	public getAll() : Observable<Author[]>{
		return this._httpClient.get<Author[]>(`${this.api}/all`);
	}
	public addAuthor(author: Author) : Observable<Author>{
		return this._httpClient.post<Author>(`${this.api}/add`,{
			'txtName': author.name,
			'txtDescription': author.description
		});
	}
	public getOneById(id) : Observable<Author>{
		return this._httpClient.get<Author>(`${this.api}/find/${id}`);
	}
	public booksOfAuthor(slug) : Observable<Product[]>{
		return this._httpClient.get<Product[]>(`${this.api}/findBooks/${slug}`);
	}
}
