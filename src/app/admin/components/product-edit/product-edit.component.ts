import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Brand } from './../../../shared/models/brand.model';
import { BrandService } from './../../../shared/services/brand.service';
import { Category } from './../../../shared/models/category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { UploadsImageService } from './../../../shared/services/upload-image.service';
import { Product } from './../../../shared/models/product.model';
import { ProductService } from './../../../shared/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
	@ViewChild('myImage') myImage;
	constructor(
		private _cateService: CategoryService,
		private _brandService: BrandService,
		private _productService: ProductService,
		private _uploadImageService: UploadsImageService,
		private _fb: FormBuilder,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }
	public loadSuccess: boolean;
	public editProduct: Product= new Product;
	ngOnInit() {
		this.createForm();
		this.loadProduct();
		this.loadCategories();
		this.loadBrands();
	}
	// tạo form
	public idProduct;
	public formEditProduct: FormGroup;
	createForm(){
		this.formEditProduct = this._fb.group({
			'sltCategory': ['', Validators.required],
			'sltBrand': ['', Validators.required],
			'txtName': ['', Validators.required],
			'txtFullName': ['', Validators.required],
			'txtBody': ['', Validators.required],
			'txtDescription': ['', Validators.required],
			'txtPrice': ['', Validators.required],
			'txtPromotionPrice': [''],
			'txtStockItems': ['', Validators.required]
		});
	}
	// load sản phẩm
	loadProduct(){
		this._sub = this._activatedRoute.params.subscribe((param: Params)=>{
			this.idProduct = param['id'];
			this._productService.getOneById(param['id']).subscribe((data: Product)=>{
				if(data['success']){
					this.loadSuccess = true;
					this.editProduct = data['data'];
				}
			});
		})
	}
	// load category
	public categories: Category[] = [];
	loadCategories(){
		this._sub = this._cateService.getAllCategories().subscribe((data: Category[])=>{
			if(data['success']){
				this.categories = data['data'];
			}
		});
	}
	// load brands
	public brands: Brand[] = [];
	loadBrands(){
		this._sub = this._brandService.getAll().subscribe((data: Category[])=>{
			if(data['success']){
				this.brands = data['data'];
			}
		});
	}
	// upload image
	public uploadNewImg: boolean = false;
	public notUpload: boolean = false;
	public nameImage: string;
	public urlImg: string;
	onUploadNewImage(){
		if(this.myImage.nativeElement.files.length > 0){
			this._sub = this._uploadImageService.uploadImage(this.myImage,'product').subscribe((data)=>{
				if(data['success']){
					this.notUpload = false;
					this.uploadNewImg = true;
					this.nameImage = data['name'];
					this.urlImg= `http://localhost:3000/api/product/img/${data['name']}`;
					this._uploadImageService.deleteImage(this.editProduct.image, 'product').subscribe(data=>{
					});
				}
			});
		}else{
			this.notUpload = true;
		}
	}
	// submitform
	public updateSuccess: boolean = false;
	public msg: string;
	onSubmit(formValue){
		// let product = new Product;
		// product.name = formValue.txtName;
		// product.body = formValue.txtBody;
		// product.price = formValue.txtPrice;
		// product.promotion_price = formValue.txtPromotionPrice || formValue.txtPrice;
		// product.stockitems = formValue.txtStockItems;
		// product.category = formValue.sltCategory;
		// product.brand = formValue.sltBrand;
		// product.writer.name = formValue.txtFullName;
		// product.image = this.nameImage;
		if(this.nameImage!==""){
			this.editProduct.image = this.nameImage;
		}
		this._sub = this._productService.updateProduct(this.idProduct, this.editProduct).subscribe((data: Product)=>{
			if(data['success']){
				this.updateSuccess = true;
				this.msg = data['msg'];
				setTimeout(()=>{
					this._router.navigate(['/admin/product/list']);
				},1000)
			}
		});
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
