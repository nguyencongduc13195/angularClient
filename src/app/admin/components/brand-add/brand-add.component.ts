import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Brand } from './../../../shared/models/brand.model';
import { BrandService } from './../../../shared/services/brand.service';
import { UploadsImageService } from './../../../shared/services/upload-image.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  	@ViewChild('myInput') myImage: any;
	constructor(
		private _formBuilder: FormBuilder, 
		private _brandService: BrandService,
		private _uploadsImageService: UploadsImageService
	) { }

	ngOnInit() {
		this.createForm();
	}

	public formAddBrand: FormGroup;
	createForm(){
		this.formAddBrand = this._formBuilder.group({
			'txtName': ['', Validators.required],
			'txtDescription': ['', Validators.required]
		})
	}
	public addSuccess: boolean = false;
	public msg: string = '';
	onSubmit(value){
		let brand = new Brand;
		brand.name = value.txtName;
		brand.description = value.txtDescription;
		brand.image = this.nameImage;
		this._sub = this._brandService.addBrand(brand).subscribe((data)=>{
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
	public urlImage: string;
	uploadImage(){
		this._sub  = this._uploadsImageService.uploadImage(this.myImage, 'brand').subscribe((data)=>{
			if(data['success']){
				this.loadImage = true;
				this.nameImage = data['name'];
				// this.urlImage = `http://localhost:3000/api/brand/img/${data['name']}`;
				this.urlImage = `https://apimean.herokuapp.com/api/brand/img/${data['name']}`;
			}
		});
	}
	resetForm(){
		this.formAddBrand.reset();
		this.myImage.nativeElement.value="";
		this.loadImage = false;
		this.urlImage ='';
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}

}
