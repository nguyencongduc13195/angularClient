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
		this.setSizeShoes();
	}
	public colors: string[] = ['White','Red','Black','Green','Yellow','Purple','Pink','Blue','Orange','Grey'];
	public sizeClothes: string[] = ['XS','S','M','L','XL','XXL'];
	public sizeShoes: string[] = [];
	setSizeShoes(){
		for (var i = 36; i <= 45; i++) {
			this.sizeShoes.push(String(i));
		}
	}
	public choiseClothesProduct: boolean = false;
	public choiseShoesProduct: boolean =false;
	public colorsChecked: any[] = [];
	public sizesChecked: any[] = [];
	toggle(item, type){
		if(type==='color'){
			if(this.colorsChecked.indexOf(item)<=-1){
				this.colorsChecked.push(item);
			}else{
				for (var i = 0; i < this.colorsChecked.length; i++) {
					if(this.colorsChecked[i]===item){
						this.colorsChecked.splice(i,1);
						break;
					}
				}
			}
		}else{
			if(this.sizesChecked.indexOf(item)<=-1){
				this.sizesChecked.push(item);
			}else{
				for (var i = 0; i < this.sizesChecked.length; i++) {
					if(this.sizesChecked[i]===item){
						this.sizesChecked.splice(i,1);
						break;
					}
				}
			}
		}
	}
	// 
	onChangeCategory(id){
		// if(id === '5a894b669e3a752974790523'){
		// 	this.choiseClothesProduct = true;
		// 	this.choiseShoesProduct = false;
		// }
		if(id === '5a894b719e3a752974790524' || id === '5a894b799e3a752974790525' || id === '5a8a8bd32e48ce0a1c09a9fb') {
			this.choiseShoesProduct = true;
			this.choiseClothesProduct = false;
		}else{
			this.choiseClothesProduct = true;
			this.choiseShoesProduct = false;
		}
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
	// chuỗi công dụng
	public useArray: string[] = [];
	pushUse(st: HTMLInputElement){
		if(this.useArray.indexOf(st.value)>-1){
			st.value = '';
		}else{
			this.useArray.push(st.value);
			st.value = '';
		}
	}
	// tạo form
	createForm(){
		this.formAdd = this._fb.group({
			'sltCategory': ['', Validators.required],
			'sltBrand': ['', Validators.required],
			'txtName': ['', Validators.required],
			'rdoGender': ['Nam'],
			'txtBody': ['', Validators.required],
			'txtGender': ['Nam', Validators.required],
			'txtDescription': ['', Validators.required],
			'txtPrice': ['', Validators.required],
			'txtPromotionPrice': [''],
			'txtStockItems': ['', Validators.required]
		})
	}
	// gửi form
	onSubmit(formValue){
		if(formValue.sltBrand === ""){
			alert('Vui lòng chọn nhà sản xuất.')
		}else if(formValue.sltCategory === ""){
			alert('Vui lòng chọn danh mục.')
		}else if(this.sizesChecked.length<=0){
			alert('Vui lòng chọn kích cỡ.')
		}
		else if(this.colorsChecked.length <=0){
			alert('Vui lòng chọn màu sắc.')
		}else if(this.useArray.length <= 0){
			alert('Vui lòng nhập chức năng.')
		}
		else{
			let product = new Product;
			product.name = formValue.txtName;
			product.category = formValue.sltCategory;
			product.brand = formValue.sltBrand;
			product.body = formValue.txtBody;
			product.description = formValue.txtDescription;
			product.price = formValue.txtPrice;
			product.color = this.colorsChecked;
			product.gender = formValue.txtGender;
			product.size = this.sizesChecked;
			product.promotion_price = formValue.txtPromotionPrice || formValue.txtPrice;
			product.stockitems = formValue.txtStockItems;
			product.imageDetail = this.imageDetail;
			product.image = this.nameImage;
			product.tag_array = this.useArray;
			this._sub = this._productService.addProduct(product).subscribe((data: Product)=>{
				if(data['success']){
					this._router.navigate(['/admin/product/list'])
				}
			});
		}
	}
	// 
	@ViewChild('myImageDetail') myImageDetail;
	public uploadNewDetailImg: boolean = false;
	public imageDetail: any[] = [];
	onUploadNewImageDetail(){
		if(this.myImageDetail.nativeElement.files.length > 0){
			this._sub = this._uploadImageService.uploadImagesDetail(this.myImageDetail).subscribe((data)=>{
				if(data['success']){
					this.uploadNewDetailImg = true;
					for (var i = 0; i < data['name'].length; i++) {
						this.imageDetail.push(data['name'][i]);
					}
					// this.urlImg= `https://apimean.herokuapp.com/api/product/images-detail/${data['name']}`;
					// this.urlImg= `http://localhost:3000/api/product/images-detail/${data['name']}`;
				}
			});
		}else{
			alert('Vui lòng chọn ảnh.')
		}
	}
	// ảnh chính
	@ViewChild('myImage') myImage;
	public uploadNewImg: boolean = false;
	public nameImage: string;
	public urlImg: string;
	onUploadNewImage(){
		if(this.myImage.nativeElement.files.length > 0){
			this._sub = this._uploadImageService.uploadImage(this.myImage,'product').subscribe((data)=>{
				if(data['success']){
					this.uploadNewImg = true;
					this.nameImage = data['name'];
					// this.urlImg= `https://apimean.herokuapp.com/api/product/images-detail/${data['name']}`;
					this.urlImg= `http://localhost:3000/api/product/images-detail/${data['name']}`;
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
