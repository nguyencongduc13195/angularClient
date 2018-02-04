import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthorService } from './../../../shared/services/author.service';
import { Product } from './../../../shared/models/product.model';
import { Author } from './../../../shared/models/author.model';
@Component({
	selector: 'app-author',
	templateUrl: './author.component.html',
	styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {

	constructor(
		private _activated: ActivatedRoute,
		private _router: Router,
		private _authorService: AuthorService
	) { }

	ngOnInit() {
		this.loadBooksOfAuthor();
	}
	public loaded: boolean = false;
	public products: Product[] = [];
	loadBooksOfAuthor(){
		this._sub = this._activated.params.subscribe((params: Params)=>{
			this._authorService.booksOfAuthor(params['slug']).subscribe((data: Product[])=>{
				this.loaded = false;
				if(data['success']){
					this.authorName = data['data'][0]['writer_name'];
					this.products = data['data'];
					this.loaded = true;
				}
				console.log(data);
			})
		})
	}
	// 
	public authorName: string;
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
