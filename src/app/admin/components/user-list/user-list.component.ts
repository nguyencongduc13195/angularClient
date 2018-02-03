import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

	constructor(
		private _userService: UserService,
		private _router: Router
	) { }

	ngOnInit() {
		this.loadUsers();
	}
	public deleteSuccess: boolean =false;
	public users: User[] = [];
	loadUsers(){
		this._sub = this._userService.getAll().subscribe((data: User[])=>{
			if(data['success']){
				this.users = data['data']
			}
			// console.log(data);
		});
	}
	navigateToEdit(idUser){
		this._router.navigate(['/admin/user/edit/', idUser]);
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}


}
