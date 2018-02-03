import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { ProductService } from './../../../shared/services/product.service';
import { CategoryService } from './../../../shared/services/category.service';
import { Product } from './../../../shared/models/product.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy, AfterViewChecked {
	constructor(
		private _productService: ProductService,
		private _categoryService: CategoryService,
		private _activatedRoute: ActivatedRoute
	) { }
	@Output('search') connect = new EventEmitter<Product[]>();
	ngOnInit() {
		setInterval(()=>{
			this.isActive++;
			if(this.isActive>3){
				this.isActive = 1;
			}
		},5000);
	}
	ngAfterViewChecked(){
		// this.loadSlider();
	}
	// 
	public homePage: boolean = true;
	public cateImg: string;
	public nameSlider;
	loadSlider(){
		if(localStorage.getItem('slider')){
			this.nameSlider = localStorage.getItem('slider');
			this._sub = this._categoryService.getCateBySlug(localStorage.getItem('slider')).subscribe((data)=>{
				if(data['success']){
					this.cateImg = data['data']['image'];
					this.homePage = false;
				}
			})
		}
	}
	public slider: number[] = [1,2,3];
	public isActive: number = 1;
	onClick(value:boolean){
		if(this.isActive == 3 && value === true){
			this.isActive = 0;
		}
		if(this.isActive == 1 && value ===false){
			this.isActive=4;
		}
		if(value=== true){
			this.isActive++;
			
		}else{
			this.isActive--;
		}
	}
	private _sub: Subscription;
	onSearch(event){
		this._productService.searchItem(event.target.value).subscribe((data)=>{
			if(data['success']){
				this.connect.emit(data['data']);
			}
		});
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
