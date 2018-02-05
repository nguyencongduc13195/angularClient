import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from './../../../shared/models/brand.model';
import { BrandService } from './../../../shared/services/brand.service';
import { UploadsImageService } from './../../../shared/services/upload-image.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-brand-list',
	templateUrl: './brand-list.component.html',
	styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit, OnDestroy {

	constructor(
		private _brandService: BrandService,
		private _uploadsImageService: UploadsImageService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) { }

	public brands: Brand[] = [];
	public loaded: boolean = false;
	ngOnInit() {
		this._sub = this._brandService.getAll().subscribe((data: Brand[]) => {
			if (data['success']) {
				this.loaded = true;
				this.brands = data['data'];
			}
		})
	}
	public deleteSuccess: boolean = false;
	public msg: string = "";
	deleteCate(id) {
		if (confirm('Bạn chắc chắn muốn xóa?')) {
			this._sub = this._brandService.getOne(id).subscribe((brand: Brand) => {
				this._brandService.getProductByBrand(brand['data']['slug']).subscribe((data) => {
					if (data['success']) {
						// Danh mục nhiều có sản phẩm 
						alert('Nhãn hàng có sản phẩm');
					} else {
						this._brandService.deleteBrand(id).subscribe((data) => {
							if (data['success']) {
								if(brand['data']['image']){
									this._uploadsImageService.deleteImage(brand['data']['image'],'brand').subscribe((data)=>{
									})
								}
								this.deleteSuccess = true;
								this.msg = data['msg'];
								for (var i = 0; i < this.brands.length; i++) {
									if(this.brands[i]['_id'] === id){
										this.brands.splice(i,1);
										break;
									}
								}
								setTimeout(() => {
									this.deleteSuccess = false;
								}, 1500)
							}
						});
					}
				})
			})
		}
	}
	navigateToEdit(id) {
		this._router.navigate(['admin/brand/edit', id])
	}

	private _sub: Subscription;
	ngOnDestroy() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}
