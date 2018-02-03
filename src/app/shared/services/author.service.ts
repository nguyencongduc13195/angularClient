import { Injectable } from '@angular/core';
import { Author } from './../models/author.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthorService {
	private api: string = 'http://localhost:3000/api/author';
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
	public booksOfAuthor(id) : Observable<any>{
		return this._httpClient.get<any>(`${this.api}/booksOfAuthor/${id}`);
	}
}
