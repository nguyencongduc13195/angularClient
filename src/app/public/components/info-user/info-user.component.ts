import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
@Component({
	selector: 'app-info-user',
	templateUrl: './info-user.component.html',
	styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit, OnDestroy {

	constructor(
		private _userService: UserService,
		private _formBuilder: FormBuilder
	) { }
	public userEdit: User = new User;
	ngOnInit() {
		this.loadInfo();
		this.createForm();
	}
	public isEditting: boolean = false;
	loadInfo(){
		this._sub = this._userService.information().subscribe((user: User)=>{
			if(user['success']){
				this.userEdit = user['data']
			}
		});
	}
	// tạo form
	public formEdit: FormGroup;
	createForm(){
		this.formEdit = this._formBuilder.group({
			'txtFullName':['', Validators.required],
			'txtPhone': ['', Validators.required],
			'txtAddress': [''],
			'txtBirthday': ['']
		});
	}
	submitEdit(value){
		// let user = new User;
		// user.full_name = value.txtFullName;
		// user.phone = value.txtPhone;
		// user.address = value.txtAddress;
		// user.birthday = value.txtBirthday;
		// if(value.txtNewPassword !== ''){
		// 	user.password = value.txtNewPassword;
		// }else{
		// 	user.password = this.userEdit.password
		// }
		// this.userEdit.full_name = value.txtFullName;
		// this.userEdit.phone = value.txtPhone;
		// this.userEdit.address = value.txtAddress;
		this.userEdit.birthday = value.txtBirthday;
		this._sub = this._userService.updateUser(this.userEdit).subscribe((data)=>{
			if(data['success']){
				this.isEditting = false;
				alert('Cập nhật thành công')
			}
		})
		console.log(this.userEdit);
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
