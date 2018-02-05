import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
// components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { OrderListComponent } from './components/order-list/order-list.component';
// services
import { AlertService } from './../shared/services/alert.service';
import { CategoryService } from './../shared/services/category.service';
import { ProductService } from './../shared/services/product.service';
import { BrandService } from './../shared/services/brand.service';
import { UploadsImageService } from './../shared/services/upload-image.service';
// guard
import { AdminGuard } from './../shared/services/admin.guard';


const adminRoutes: Routes = [
	{ path: 'admin', component: AdminComponent, canActivate:[AdminGuard], children:[
		{path:'', component: DashboardComponent},
		{path:'category/add', component: CategoryAddComponent},
		{path:'category/list', component: CategoryListComponent},
		{path:'category/edit/:id', component: CategoryEditComponent},
		{path:'brand/add', component: BrandAddComponent},
		{path:'brand/list', component: BrandListComponent},
		{path:'brand/edit/:id', component: BrandEditComponent},
		{path:'product/add', component: ProductAddComponent},
		{path:'product/list', component: ProductListComponent},
		{path:'product/edit/:id', component: ProductEditComponent},
		{path:'user/add', component: UserAddComponent},
		{path:'user/list', component: UserListComponent},
		{path:'user/edit/:id', component: UserEditComponent},
		{path:'order/list', component: OrderListComponent}
	]}
]
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(adminRoutes),
		ReactiveFormsModule,
		FormsModule,
		CKEditorModule
	],
	declarations: [
		AdminComponent, 
		DashboardComponent, 
		MenuComponent,
		CategoryAddComponent,
		CategoryListComponent,
		BrandAddComponent,
		BrandListComponent,
		CategoryEditComponent,
		BrandEditComponent,
		ProductAddComponent,
		ProductListComponent,
		ProductEditComponent,
		UserListComponent,
		UserAddComponent,
		UserEditComponent,
		OrderListComponent
	],
	providers: [
		AlertService,
		CategoryService,
		BrandService,
		ProductService,
		AdminGuard,
		UploadsImageService
	]
})
export class AdminModule { }
