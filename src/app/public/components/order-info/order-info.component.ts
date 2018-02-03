import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-order-info',
	templateUrl: './order-info.component.html',
	styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit, OnDestroy {
	@Output('info') connector = new EventEmitter<any>();
	constructor(private _formBuiler: FormBuilder, private _userService: UserService) { }
	public formOrder: FormGroup;
	public user: User = new User;
	private _sub: Subscription;
	ngOnInit() {
		this.formOrder = this._formBuiler.group({
			txtName: ['', Validators.required],
			txtAddress: ['', Validators.required],
			txtPhone: ['', Validators.required],
			txtNote: [''],
			rdoPayment: [1]
		});
		this._userService.information().subscribe(data=>{
			this.user = data['data'];
		});
	}
	selectPayment(value){
		this.formOrder.patchValue({
			rdoPayment: value
		});
	}
	onSubmit(form){
		this.connector.emit(form);
	}
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}

}
