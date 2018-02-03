import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

	constructor(
		private _formBuilder: FormBuilder,
		private _userService: UserService,
		private _router: Router
	) { }
	private _sub: Subscription;

	// tạo form đăng ký
	public formRegister: FormGroup;
	createFormRegister(){
		this.formRegister = this._formBuilder.group({
			'txtFullName' : ["",Validators.required],
			'txtEmail' : ["",Validators.compose([
				Validators.required,
				Validators.email
			])],
			'txtPassword' : ["",Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20)
			])],
			'txtPhone': ["",Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(11)
			])],
			'txtRePassword': ["",Validators.required],
			'txtBirthday': ["",Validators.required],
			'rdoGender': [''],
			"txtAddress": ['']
		});
	}
	// kiểm tra email
	public existingEmail: boolean = true;
	onCheckEmail(){
		this._sub = this._userService.checkExistEmail(this.formRegister.controls['txtEmail'].value).subscribe(
			(data: User)=>{
				this.existingEmail = data['success']
			});
	}
	// kiểm tra mật khẩu
	public matchPassword: boolean = false;
	checkPassword(){
		if(this.formRegister.controls['txtPassword'].value !== this.formRegister.controls['txtRePassword'].value){
			this.matchPassword = false;
		}else{
			this.matchPassword = true;
		}
	}
	// đăng ký
	public sltGender: number = 1;
	disableForm(){
		this.formRegister.controls['txtFullName'].disable();
		this.formRegister.controls['txtEmail'].disable();
		this.formRegister.controls['txtPassword'].disable();
		this.formRegister.controls['txtRePassword'].disable();
		this.formRegister.controls['txtPhone'].disable();
		this.formRegister.controls['txtAddress'].disable();
		this.formRegister.controls['rdoGender'].disable();
		this.formRegister.controls['txtBirthday'].disable();
	}
	public success_register: boolean = false;
	public msg: string;
	public msgClass: string;
	public rdoGender: string;
	onRegister(value){
		let user = new User;
		user.full_name = value.txtFullName;
		user.email = value.txtEmail;
		user.password = value.txtPassword;
		user.phone = value.txtPhone;
		user.birthday = value.txtBirthday;
		user.gender = value.rdoGender;
		user.address = value.txtAddress;
		this._sub = this._userService.registerUser(user).subscribe((data: User)=>{
			this.success_register = data['success'];
			this.msg = data['msg'];
			if(data['success']){
				this.msgClass = 'alert alert-success';
				this.disableForm();
				this.success_register = true;
				setTimeout(()=>{
					this._router.navigate(['/']);
				},1000)
			}
		});
	}

	ngOnInit(){
		this.createFormRegister();
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
