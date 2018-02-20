import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../../shared/models/product.model';
import { ProductService } from './../../../shared/services/product.service';
import { Category } from './../../../shared/models/category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { Brand } from './../../../shared/models/brand.model';
import { BrandService } from './../../../shared/services/brand.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

	constructor(
		private _productService: ProductService,
		private _brandService: BrandService,
		private _cateService: CategoryService,
		private _router: Router
	) { }
	public products: Product[] = [];
	public categories: Category[] = [];
	public brands: Brand[] = [];
	ngOnInit() {
		this.loadProduct();
		this.loadCate();
		this.loadBrand();
	}
	// product
	public totalPage: number[] = [];
	public allPage: number;
	public pageIndex: number;
	public loaded: boolean = false;
	loadProduct(pageIndex: number = 1, pageSize: number = 5){
		this._sub = this._productService.getAll(pageIndex, pageSize).subscribe((data: Product[])=>{
			if(data['success']){
				this.loaded = true;
				this.totalPage = [];
				for (var i = 1; i <= data['totalPage']; i++) {
					this.totalPage.push(i);
				}
				this.products = data['data'];
				this.allPage = data['totalPage'];
				this.pageIndex = data['pageIndex'];
			}
		});
	}
	setPage(value){
		this.loadProduct(value);
	}
	// cate
	loadCate(){
		this._sub = this._cateService.getAllCategories().subscribe((data: Category[])=>{
			if(data['success']){
				this.categories = data['data'];
			}
		})
	}
	// brand
	loadBrand(){
		this._sub = this._brandService.getAll().subscribe((data: Brand[])=>{
			if(data['success']){
				this.brands = data['data'];
			}
		})
	}
	// chuyển trang sửa
	navigateToEdit(id){
		this._router.navigate(['admin/product/edit/',id]);
	}
	// update brand datatable
	public changeBrandArray: string[] = [];
	onChangeBrand(value){
		this.changeBrandArray = [];
		this.changeBrandArray.push(value);
	}
	public updateBrandSuccess: boolean = false;
	updateBrand(idProduct, idBrand){
		this._sub = this._productService.updateBrand(idProduct, idBrand).subscribe((data)=>{
			if(data['success']){
				this.updateBrandSuccess = true;
				setTimeout(()=>{
					this.changeBrandArray = [];
					this.updateBrandSuccess = false;
				},1000)
			}
		})
	}
	// update cate datatable
	public changeCateArray: string[] = [];
	onChangeCate(value){
		this.changeCateArray = [];
		this.changeCateArray.push(value);
	}
	public updateCateSuccess: boolean = false;
	updateCate(idProduct, idCate){
		this._sub = this._productService.updateCate(idProduct, idCate).subscribe((data)=>{
			if(data['success']){
				this.updateCateSuccess = true;
				setTimeout(()=>{
					this.changeCateArray = [];
					this.updateCateSuccess = false;
				},500)
			}
		})
	}
	// xóa
	public deleteSuccess: boolean = false;
	public msg: string;
	deleteProduct(id){
		if(confirm('Bạn chắc chắn xóa sản phẩm')){
			this._sub = this._productService.deleteProduct(id).subscribe((data: Product)=>{
				if(data['success']){
					this.deleteSuccess = true;
					this.msg = data['msg'];
					this.products.splice(this.products.indexOf(id),1);
					this.loadProduct();
					setTimeout(()=>{
						this.deleteSuccess = false;
						// this._router.navigate(['admin/product/list']);
					},1500);
				}else{
					this.deleteSuccess = true;
					this.msg = data['msg'];
				}
			});
		}
		
	}
	// destroy
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}

}
