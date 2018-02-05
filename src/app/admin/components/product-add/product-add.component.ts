import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from './../../../shared/models/product.model';
import { Router } from '@angular/router';
import { Brand } from './../../../shared/models/brand.model';
import { Category } from './../../../shared/models/category.model';
import { Author } from './../../../shared/models/author.model';
import { ProductService } from './../../../shared/services/product.service';
import { BrandService } from './../../../shared/services/brand.service';
import { AuthorService } from './../../../shared/services/author.service';
import { CategoryService } from './../../../shared/services/category.service';
import { UploadsImageService } from './../../../shared/services/upload-image.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-product-add',
	templateUrl: './product-add.component.html',
	styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnDestroy {
	@ViewChild('myImage') myImage;
	constructor(
		private _productService: ProductService,
		private _cateService: CategoryService,
		private _brandService: BrandService,
		private _authorService: AuthorService,
		private _uploadImageService: UploadsImageService,
		private _fb: FormBuilder,
		private _router: Router
	) { }
	public formAdd: FormGroup;
	ngOnInit() {
		this.loadCategories();
		this.loadBrands();
		this.createForm();
	}
	// load cate
	public categories: Category[] = [];
	loadCategories(){
		this._sub = this._cateService.getAllCategories().subscribe((data: Category[])=>{
			if(data['success']){
				this.categories = data['data'];
			}
		});
	} 
	// load brand
	public brands: Brand[] = [];
	loadBrands(){
		this._sub = this._brandService.getAll().subscribe((data: Brand[])=>{
			if(data['success']){
				this.brands = data['data'];
			}
		});
	} 
	// tạo form
	createForm(){
		this.formAdd = this._fb.group({
			'sltCategory': ['', Validators.required],
			'sltBrand': ['', Validators.required],
			'txtFullName': ['', Validators.required],
			'txtName': ['', Validators.required],
			'txtBody': ['', Validators.required],
			'txtDescription': ['', Validators.required],
			'txtPrice': ['', Validators.required],
			'txtPromotionPrice': [''],
			'txtStockItems': ['', Validators.required]
		})
	}
	// gửi form
	onSubmit(formValue){
		if(formValue.sltBrand === ""){
			alert('Vui lòng chọn nhà xuất bản.')
		}
		else if(formValue.sltCategory === ""){
			alert('Vui lòng chọn danh mục.')
		}
		else{
			let product = new Product;
			product.name = formValue.txtName;
			product.category = formValue.sltCategory;
			product.brand = formValue.sltBrand;
			product.writer_name = formValue.txtFullName;
			product.body = formValue.txtBody;
			product.description = formValue.txtDescription;
			product.price = formValue.txtPrice;
			product.promotion_price = formValue.txtPromotionPrice || formValue.txtPrice;
			product.stockitems = formValue.txtStockItems;
			product.image = this.nameImage;
			this._sub = this._productService.addProduct(product).subscribe((data: Product)=>{
				if(data['success']){
					this._router.navigate(['/admin/product/list'])
				}
			});
		}
	}
	// 
	public uploadNewImg: boolean = false;
	public nameImage: string;
	public urlImg: string;
	onUploadNewImage(){
		if(this.myImage.nativeElement.files.length > 0){
			this._sub = this._uploadImageService.uploadImage(this.myImage,'product').subscribe((data)=>{
				if(data['success']){
					this.uploadNewImg = true;
					this.nameImage = data['name'];
					this.urlImg= `https://apimean.herokuapp.com/api/product/img/${data['name']}`;
					// this.urlImg= `http://localhost:3000/api/product/img/${data['name']}`;
				}
			});
		}else{
			alert('Vui lòng chọn ảnh.')
		}
	}
	// 
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
