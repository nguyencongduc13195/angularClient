import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Brand } from './../../../shared/models/brand.model';
import { BrandService } from './../../../shared/services/brand.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-brand-edit',
	templateUrl: './brand-edit.component.html',
	styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit, OnDestroy {

	constructor(
		private _formBuilder: FormBuilder,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _brandService: BrandService
	) { }
	public editBrand: Brand = new Brand;
	public loadSuccess: boolean = false;
	public updateSuccess: boolean = false;
	public msg: string;
	ngOnInit() {
		this.loadEditBrand();
		this.createForm();
	}
	public idBrand;
	loadEditBrand(){
		this._sub = this._activatedRoute.params.subscribe((param)=>{
			this.idBrand = param['id'];
			this._brandService.getOne(param['id']).subscribe((data: Brand)=>{
				if(data['success']){
					this.loadSuccess = true;
					this.editBrand = data['data'];
				}else{
					this.msg = "Không tìm được sản phẩm."
				}
			})
		});
	}
	public formEditBrand: FormGroup;
	createForm(){
		this.formEditBrand = this._formBuilder.group({
			'txtName': ['', Validators.required],
			'txtDescription': ['', Validators.required]
		})
	}
	onSubmit(fValue){
		this._sub = this._brandService.updateBrand(this.idBrand, this.editBrand).subscribe((data)=>{
			console.log(data);
			if(data['success']){
				this.updateSuccess = true;
				this.msg = data['msg'];
				setTimeout(()=>{
					this.updateSuccess = false;
					this._router.navigate(['admin/brand/list'])
				},1500)
			}
		})
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
