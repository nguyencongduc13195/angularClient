import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from './../../../shared/models/category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { AlertService } from './../../../shared/services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

	constructor(
		private _cateService: CategoryService, 
		private _alertService: AlertService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) { }

	private _sub: Subscription;
	public categories: Category[] = [];
	public loaded: boolean = false;
	ngOnInit() {
		this._sub = this._cateService.getAllCategories().subscribe((data)=>{
			if(data['success']){
				this.loaded = true;
				this.categories = data['data'];
			}
		})
	}
	public deleteSuccess: boolean = false;
	public msg: string = "";
	deleteCate(id){
		if(confirm('Bạn chắc chắn muốn xóa?')){
			this._sub = this._cateService.getOne(id).subscribe((cate: Category)=>{
				this._cateService.getProductByCategories(cate['data']['slug']).subscribe((data)=>{
					if(data['success']){ 
						// Danh mục nhiều có sản phẩm 
						alert('Danh mục có sản phẩm');
					}else{
						this._cateService.deleteCate(id).subscribe((data)=>{
							if(data['success']){
								if(cate['data']['image']){
									this._cateService.deleteImage(cate['data']['image']).subscribe((data)=>{
									});
								}
								this.deleteSuccess = true;
								this.msg = data['msg'];
								for (var i = 0; i < this.categories.length; i++) {
									if(this.categories[i]['_id'] === id){
										this.categories.splice(i,1);break;
									}
								}
								setTimeout(()=>{
									this.deleteSuccess = false;
									if(this.categories.length === 0){
										this.loaded = false;
									}
								}, 1000)
							}
						});
					}
				})
			})
		}
	}
	navigateToEdit(id){
		this._router.navigate(['admin/category/edit',id])
	}
	ngOnDestroy(){	
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
