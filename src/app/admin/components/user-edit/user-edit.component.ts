import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _fb: FormBuilder,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.loadEditUser();
		this.createForm();
	}
	// tạo form
	public formEditUser: FormGroup;
	createForm(){
		this.formEditUser = this._fb.group({
			'txtFullName': ['', Validators.required],
			'txtEmail': ['', Validators.required],
			'txtAddress': [''],
			'txtPhone': ['', Validators.required],
			'txtBirthday': ['', Validators.required],
			'txtGender': [''],
			'txtLevel': ['']
		});
	}
	//
	public editUser: User = new User; 
	public idUser;
	loadEditUser(){
		this._sub = this._activatedRoute.params.subscribe((param: Params)=>{
			this.idUser = param['id'];
			this._userService.getOne(param['id']).subscribe((data: User)=>{
				// console.log(data);
				this.editUser = data['data']
			});
		})
	}
	public updateSuccess: boolean = false;
	public msg: string = '';
	onSubmit(formValue){
		// let editUser: User = new User;
		// editUser.full_name = formValue.txtFullName;
		// editUser.email = formValue.txtEmail;
		// editUser.address = formValue.txtAddress;
		// editUser.phone = formValue.txtPhone;
		// editUser.birthday = formValue.txtBirthday;
		// editUser.level = parseInt(formValue.sltLevel);
		// editUser.gender = parseInt(formValue.sltGender);
		this.editUser.birthday = formValue.txtBirthday;
		this._sub = this._userService.updateUserByAdmin(this.idUser, this.editUser).subscribe((data)=>{
			if(data['success']){
				this.updateSuccess = true;
				this.msg = data['msg'];
				setTimeout(()=>{
					this._router.navigate(['/admin/user/list']);
					this.updateSuccess = false;
				},1000)
			}
		})
		// console.log(editUser);
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
