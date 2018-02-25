import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './../../../shared/services/category.service';
import { Category } from './../../../shared/models/category.model';
import { BrandService } from './../../../shared/services/brand.service';
import { Brand } from './../../../shared/models/brand.model';
import { AuthorService } from './../../../shared/services/author.service';
import { Router } from '@angular/router';
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
		private _authorService: AuthorService,
		private _router: Router
	) { }

	ngOnInit() {
		this.loadBrands();
		this.loadCategories();
		this.setSizeShoes();
	}
	public listSizeClothes: string[] = ['S','M','L','XL','XXL'];
	public listSizeShoes: string[] = [];
	setSizeShoes(){
		for (var i = 36; i <= 45; i++) {
			this.listSizeShoes.push(String(i));
		}
	}
	private _sub: Subscription;
	public arrayMenu: any[]=[];
	// 
	public arrayList: string[]=[];
	navigateToSize(item){
		this.arrayList = [];
		this.arrayList.push(item);
		this._router.navigate(['/'],{queryParams: {size: item}});
	}
	navigateToColor(item){
		this.arrayList = [];
		this.arrayList.push(item);
		this._router.navigate(['/'],{queryParams: {color: item}});
	}
	// 
	currentMoney: number = 0;
	onChangePrice(event){
		this.currentMoney = event.target.value;
		this._router.navigate(['/'],{queryParams:{price: this.currentMoney}});
	}
	public colors: string[] = ['White','Red','Black','Green','Yellow','Purple','Pink','Blue','Orange','Grey'];

	// categories
	public categories: Category[] = [];
	public cateMenu: any[] = [];
	loadCategories(){
		this._sub = this._categoryService.getAllCategories().subscribe((data)=>{ 
			if(data['success']){
				this.categories = data['data'];
				this.categories.forEach((val)=>{
					this._categoryService.booksOfCate(val._id).subscribe((data)=>{
						if(data['success']){
							let item: {} = {name:val.name,item:data['data'],slug: val.slug}
							this.cateMenu.push(item);
						}	
					})
				})
			}
		});
	}
	// brands
	public brands: Brand[] = [];
	public idBrands: number[] = [];
	public brandMenu: any[] = [];
	loadBrands(){
		this._sub = this._brandService.getAll().subscribe((data)=>{ 
			if(data['success']){
				this.brands = data['data']; 
				this.brands.forEach((val)=>{
					this._brandService.booksOfBrand(val._id).subscribe((data)=>{
						if(data['success']){
							let item: {} = {name:val.name,item:data['data'],slug: val.slug}
							this.brandMenu.push(item)
						}
					})
				})
			}
		});
	}
	onToggle(type: string){
		// if(type==='cate'){
		// 	this.isShowCate = !this.isShowCate;
		// 	if((this.isShowCate && this.isShowBrand) || (this.isShowCate && this.isShowGender)){
		// 		this.isShowBrand = false;
		// 		this.isShowGender = false;
		// 	}
		// }else if(type==='brand'){
		// 	this.isShowBrand = !this.isShowBrand;
		// 	if((this.isShowBrand && this.isShowCate) || (this.isShowBrand && this.isShowGender)){
		// 		this.isShowCate = false;
		// 		this.isShowGender = false;
		// 	}
		// }else{
		// 	this.isShowGender = !this.isShowGender;
		// 	if((this.isShowGender && this.isShowCate) || (this.isShowBrand && this.isShowGender)){
		// 		this.isShowCate = false;
		// 		this.isShowBrand = false;
		// 	}
		// }
			// this.arrayMenu = [];
			// this.arrayMenu.push(type);
		if(this.arrayMenu.length <= 0){
			this.arrayMenu.push(type);
		}else{
			if(this.arrayMenu.indexOf(type)!== -1){
				this.arrayMenu = [];
			}else{
				this.arrayMenu = [];
				this.arrayMenu.push(type);
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
