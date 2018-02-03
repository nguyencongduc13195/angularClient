import { Component, OnInit, OnDestroy } from '@angular/core';
import { Author } from './../../../shared/models/author.model';
import { AuthorService } from './../../../shared/services/author.service';
import { UploadsImageService } from './../../../shared/services/upload-image.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-author-list',
	templateUrl: './author-list.component.html',
	styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {

	constructor(
		private _authorService: AuthorService,
		private _uploadsImageService: UploadsImageService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) { }
	public deleteSuccess: boolean=false;
	public authors: Author[] = [];
	public loaded: boolean = false;
	ngOnInit() {
		this._sub = this._authorService.getAll().subscribe((data: Author[]) => {
			if (data['success']) {
				this.loaded = true;
				this.authors = data['data'];
			}
		})
	}
	navigateToEdit(id) {
		this._router.navigate(['admin/author/edit', id])
	}
	private _sub: Subscription;
	ngOnDestroy() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}

}
