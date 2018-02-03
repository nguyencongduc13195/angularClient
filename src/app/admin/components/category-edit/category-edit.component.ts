import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from './../../../shared/models/category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-category-edit',
	templateUrl: './category-edit.component.html',
	styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

	constructor(
		private _formBuilder: FormBuilder,
		private _cateService: CategoryService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) { }
	public editCate: Category = new Category;
	ngOnInit() {
		this.createForm();
		this.loadEditCate();
	}
	public loadSuccess: boolean = false;
	public msg: string = '';
	public idCate;
	loadEditCate(){
		this._sub = this._activatedRoute.params.subscribe((param)=>{
			this.idCate = param['id'];
			this._cateService.getOne(param['id']).subscribe((data: Category)=>{
				if(data['success']){
					this.loadSuccess = true;
					this.editCate = data['data'];
				}
				else{
					this.loadSuccess = false;
					this.msg = 'Không tìm thấy sản phẩm.'
				}
			})
		});
	}

	public formEditCate: FormGroup;
	createForm(){
		this.formEditCate = this._formBuilder.group({
			'txtName': ['', Validators.required],
			'txtDescription': ['', Validators.required]
		})
	}
	public updateSuccess: boolean = false;
	onSubmit(value){
		let cate = new Category;
		cate.name = value.txtName;
		cate.description = value.txtDescription;
		this._sub = this._cateService.updateCate(cate, this.idCate).subscribe((data: Category)=>{
			if(data['success']){
				this.msg = data['msg'];
				this.updateSuccess = true;
				setTimeout(()=>{
					this.updateSuccess = false;
					this._router.navigate(['/admin/category/list'])
				},1500);
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
