import { Component, OnInit, ViewChild, OnDestroy, DoCheck } from '@angular/core';
import { CartService } from './../../../shared/services/cart.service';
import { UserService } from './../../../shared/services/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../shared/models/user.model';
import { CartItem } from './../../../shared/models/cart.model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, DoCheck {
	constructor(
		private _cartService: CartService, 
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _userService: UserService
	) { }

	
	private _sub: Subscription;
	@ViewChild('autoShownModal') public autoShownModal:ModalDirective;
	public isModalShown: boolean = false;
	public totalQty: number = 0;
	public cartItems: CartItem[] = [];
	public isLogging: boolean = false;
	ngOnInit() {
		this.createFormLogin();
	}
	ngDoCheck(){
		this.totalQty = this._cartService.totalQty;
		this.cartItems = this._cartService.items;
		this.isLogging = this._userService.loggedIn();
		this.isAdmin = localStorage.getItem('role') || '';
		this._userService.isAdmin = localStorage.getItem('role') === '1301' ? true : false;
	}

	// form đăng nhập
	public formLogin: FormGroup;
	public showhidePassword: boolean = true;
	createFormLogin(){
		this.formLogin = this._formBuilder.group({
			'txtEmail': ["",Validators.compose([
				Validators.required,
				Validators.email
			])],
			'txtPassword': ["",Validators.required]
			});
	}
	togglePassword(){
		this.showhidePassword = !this.showhidePassword;
	}
	public isAdmin: string ;
	loadInformation(){
		this._sub = this._userService.information().subscribe((data)=>{
			if(data['success']){
				if(data['data']['level'] === 'Admin'){
					localStorage.setItem('role', JSON.stringify(1301))
				}else{
					localStorage.setItem('role', JSON.stringify(1))
				}
			}
		})
	}
	// đăng nhập
	public msg: string;
	public msgClass: string;
	public isLogin: boolean = false;
	public success_login: boolean = false;
	onLogin(form){
		let user = new User();
		user.email = form.txtEmail,
		user.password = form.txtPassword;
		this._sub = this._userService.login(user).subscribe((data: User)=>{
			if(data['success']){
				localStorage.setItem('token',data['token']);
				this.isLogin = true;
				this.msg = data['msg'];
				this.msgClass = 'alert alert-success';
				// this.disabledForm();
				this.success_login = true;
				setTimeout(()=>{
					this.isModalShown = false;
					this.success_login = false;
				},1000);
				this._router.navigate(['/']);
				this.loadInformation();
			}
			else{
				this.isLogin = true;
				this.msg = data['msg'];
				this.msgClass = 'alert alert-danger';
				this.formLogin.controls['txtPassword'].reset();
			}
		});
	}
	// disabled form - enabled form
	disabledForm(){
		this.formLogin.controls['txtEmail'].disable();
		this.formLogin.controls['txtPassword'].disable();
	}
	enabledForm(){
		this.formLogin.controls['txtEmail'].enable();
		this.formLogin.controls['txtPassword'].enable();
	}
	// reset form
	resetForm(){
		this.formLogin.controls['txtEmail'].reset();
		this.formLogin.controls['txtPassword'].reset();
	}
	// chuyển trang đặt hàng
	getToOrder(){
		if(this._cartService.items.length > 0){
			this._router.navigate(['/order']);
		}
		else{
			alert('Bạn chưa có sản phẩm trong giỏ hàng.');
		}
	}
	// modal
	public showModal(): void {
		this.isModalShown = true;
		this.resetForm();
		this.enabledForm();
		this.isLogin = false;
	}

	public hideModal(): void {
		this.autoShownModal.hide();
	}

	public onHidden(): void {
		this.isModalShown = false;
	}
	// 
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}

