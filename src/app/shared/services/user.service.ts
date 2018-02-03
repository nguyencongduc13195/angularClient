import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../shared/models/user.model';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable()
export class UserService {
	public isAdmin: boolean;
	constructor(private _httpClient: HttpClient, private _router: Router) { }
	private _api: string = 'https://apimean.herokuapp.com/api/user';
	// private _api: string = 'http://localhost:3000/api/user';
	login(user: User): Observable<User>{
		return this._httpClient.post<User>(`${this._api}/login`,{
			'txtEmail': user.email,
			'txtPassword': user.password
		});
	}
	loggedIn() {
		if(!tokenNotExpired('token')){
			localStorage.clear();
		}
		return tokenNotExpired('token');
	}
	logout(){
		// localStorage.removeItem('token');
		localStorage.clear();
		this._router.navigate(['/']);
	}
	information() : Observable<User>{
		if(localStorage.getItem('token')){
			const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
			return this._httpClient.get<User>(`${this._api}/information`,{headers});
		}
		
	}
	checkExistEmail(email: string) : Observable<User>{
		return this._httpClient.get<User>(`${this._api}/checkemail/${email}`);
	}
	registerUser(user: User) : Observable<User>{
		return this._httpClient.post<User>(`${this._api}/register`, {
			'txtFullName': user.full_name,
			'txtEmail': user.email,
			'txtPassword': user.password,
			'txtPhone': user.phone,
			'rdoGender': user.gender,
			'txtBirthday': user.birthday,
			'txtAddress': user.address
		});
	}
	updateUser(user: User) : Observable<User>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		return this._httpClient.put<User>(`${this._api}/update`, {
			'txtFullName': user.full_name,
			'txtEmail': user.email,
			'txtPhone': user.phone,
			'rdoGender': user.gender,
			'txtBirthday': user.birthday,
			'txtAddress': user.address
		},{headers});
	}
	updateUserByAdmin(idUser, user: User) : Observable<User>{
		return this._httpClient.put<User>(`${this._api}/update-user/${idUser}`, {
			'txtFullName': user.full_name,
			'txtEmail': user.email,
			'txtPhone': user.phone,
			'txtGender': user.gender,
			'txtBirthday': user.birthday,
			'txtAddress': user.address,
			'txtLevel': user.level
		});
	}
	checkOldPassword(oldPassword): Observable<User>{
		const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
		return this._httpClient.get<User>(`${this._api}/check-password/${oldPassword}`,{headers});
	}
	getAll() : Observable<User[]>{
		return this._httpClient.get<User[]>(`${this._api}/all`);
	}
	getOne(idUser) : Observable<User>{
		return this._httpClient.get<User>(`${this._api}/find/${idUser}`);
	}
	forgotPassword(user: User): Observable<User>{
		return this._httpClient.post<User>(`${this._api}/forgot-password`,{
			'txtEmail': user.email,
			'txtFullName': user.full_name,
			'txtPhone': user.phone,
			'txtPassword': user.password
		})
	}
}
