import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Author } from './../../../shared/models/author.model';
import { AuthorService } from './../../../shared/services/author.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app-author-add',
	templateUrl: './author-add.component.html',
	styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit, OnDestroy {

	constructor(
		private _authorService: AuthorService,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.createForm();
	}
	public formAddAuthor: FormGroup;
	createForm(){
		this.formAddAuthor = this._formBuilder.group({
			'txtName': ['', Validators.required],
			'txtDescription': ['', Validators.required]
		})
	}
	public addSuccess: boolean = false;
	public msg: string = '';
	onSubmit(value){
		let author = new Author;
		author.name = value.txtName;
		author.description = value.txtDescription;
		this._sub = this._authorService.addAuthor(author).subscribe((data: Author)=>{
			if(data['success']){
				this.addSuccess = true;
				this.msg = data['msg'];
				this.formAddAuthor.reset();
				setTimeout(()=>{
					this.addSuccess = false;
				},1000);
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
