import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './../../../shared/services/category.service';
import { Category } from './../../../shared/models/category.model';
import { BrandService } from './../../../shared/services/brand.service';
import { Brand } from './../../../shared/models/brand.model';
import { AuthorService } from './../../../shared/services/author.service';
import { Author } from './../../../shared/models/author.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

	constructor(
		private _categoryService: CategoryService, 
		private _brandService: BrandService,
		private _authorService: AuthorService
	) { }

	ngOnInit() {
		this.loadBrands();
		this.loadCategories();
		// this.loadAuthors();
	}
	private _sub: Subscription;
	public isShowCate: boolean = false;
	public isShowBrand: boolean = false;
	public isShowAuthor: boolean = false;
	// categories
	public categories: Category[] = [];
	public idCategories: number[] = [];
	loadCategories(){
		this._sub = this._categoryService.getAllCategories().subscribe((data)=>{ 
			if(data['success']){
				this.categories = data['data'];
				this.categories.forEach((val)=>{
					this._categoryService.booksOfCate(val._id).subscribe((data)=>{
						if(data['success']){
							this.idCategories.push(data['data'])
						}
					})
				})
			}
		});
	}
	// brands
	public brands: Brand[] = [];
	public idBrands: number[] = [];
	loadBrands(){
		this._sub = this._brandService.getAll().subscribe((data)=>{ 
			if(data['success']){
				this.brands = data['data']; 
				this.brands.forEach((val)=>{
					this._brandService.booksOfBrand(val._id).subscribe((data)=>{
						if(data['success']){
							this.idBrands.push(data['data'])
						}
					})
				})
			}
		});
	}
	// authors
	// public authors: Author[] = [];
	// public idAuthors: number[] = [];
	// loadAuthors(){
	// 	this._sub = this._authorService.getAll().subscribe(data=>{ 
	// 		this.authors = data['data']; 
	// 		this.authors.forEach((value)=>{
	// 			// this.idAuthors.push(value['_id'])
	// 			this._authorService.booksOfAuthor(value['_id']).subscribe((data)=>{
	// 				if(data['success']){
	// 					this.idAuthors.push(data['data'])
	// 				}
	// 			})
	// 		})
	// 	});
	// }
	// 
	onToggle(type: string){
		if(type==='cate'){
			this.isShowCate = !this.isShowCate;
			if((this.isShowCate && this.isShowBrand) || (this.isShowCate && this.isShowAuthor)){
				this.isShowBrand = false;
				this.isShowAuthor = false;
			}
		}else if(type==='brand'){
			this.isShowBrand = !this.isShowBrand;
			if((this.isShowBrand && this.isShowCate) || (this.isShowBrand && this.isShowAuthor)){
				this.isShowCate = false;
				this.isShowAuthor = false;
			}
		}else{
			this.isShowAuthor = !this.isShowAuthor;
			if((this.isShowAuthor && this.isShowCate) || (this.isShowBrand && this.isShowAuthor)){
				this.isShowCate = false;
				this.isShowBrand = false;
			}
		}
	}
	// 
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
