import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

	constructor(
		private _formBuilder: FormBuilder,
		private _userService: UserService,
		private _router: Router
	) { }
	private _sub: Subscription;
	
	ngOnInit() {
		this.createFormFP();
	}
	public formFP: FormGroup;
	createFormFP(){
		this.formFP = this._formBuilder.group({
			'txtFullName' : ["",Validators.required],
			'txtEmail' : ["",Validators.compose([
				Validators.required,
				Validators.email
			])],
			'txtPhone': ["",Validators.required],
			'txtPassword': ["",Validators.required]
		});
	}
	public errors: boolean= false;
	public success: boolean= false;
	public msg: string= '';
	onSubmit(formValue){
		let info = new User;
		info.full_name = formValue.txtFullName;
		info.email = formValue.txtEmail;
		info.phone = parseInt(formValue.txtPhone);
		info.password = formValue.txtPassword;
		this._sub = this._userService.forgotPassword(info).subscribe((data)=>{
			if(data['success']){
				this.success = true;
				this.msg = data['msg'];
				setTimeout(()=>{
					this._router.navigate(['/']);
				},1000)
			}else{
				this.errors = true;
				this.msg = data['msg'];
			}
		})
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}	
