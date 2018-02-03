import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from './../../../shared/models/category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { UploadsImageService } from './../../../shared/services/upload-image.service';

@Component({
	selector: 'admin-category-add',
	templateUrl: './category-add.component.html',
	styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit, OnDestroy {
	@ViewChild('myInput') myImage: any;
	constructor(
		private _formBuilder: FormBuilder, 
		private _cateService: CategoryService,
		private _activatedRoute: ActivatedRoute,
		private _uploadsImageService: UploadsImageService
	) { }

	ngOnInit() {
		this.createForm();
	}

	public formAddCate: FormGroup;
	createForm(){
		this.formAddCate = this._formBuilder.group({
			'txtName': ['', Validators.required],
			'txtDescription': ['', Validators.required],
			'txtImage': ['']
		})
	}
	public addSuccess: boolean = false;
	public msg: string = '';
	onSubmit(value){
		let cate = new Category;
		cate.name = value.txtName;
		cate.description = value.txtDescription;
		cate.image = this.nameImage;
		this._sub = this._cateService.addCate(cate).subscribe((data)=>{
			if(data['success']){
				this.addSuccess = true;
				this.msg = data['msg'];
				this.resetForm();
				setTimeout(()=>{
					this.addSuccess = false;
				},1000);
			}
		});
	}
	public loadImage: boolean = false;
	public nameImage: string;
	public urlImg: string;
	uploadImg(){
		if(this.myImage.nativeElement.files.length > 0){
			this._sub = this._uploadsImageService.uploadImage(this.myImage, 'category').subscribe((data)=>{
				if(data['success']){
					console.log(data);
					this.loadImage = true;
					this.nameImage = data['name'];
					this.urlImg = `http://localhost:3000/api/category/img/${data['name']}`
					// this.urlImg = `https://apimean.herokuapp.com/api/category/img/${data['name']}`
				}
			});
		}else{
			alert('Vui lòng chọn ảnh.')
		}
	}
	resetForm(){
		this.formAddCate.reset();
		this.myImage.nativeElement.value="";
		this.loadImage = false;
		this.urlImg = "";
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
