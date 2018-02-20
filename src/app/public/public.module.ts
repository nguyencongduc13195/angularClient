import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// services
import { CategoryService } from './../shared/services/category.service';
import { AuthorService } from './../shared/services/author.service';
import { BrandService } from './../shared/services/brand.service';
import { ProductService } from './../shared/services/product.service';
import { CartService } from './../shared/services/cart.service';
import { OrderService } from './../shared/services/order.service';
import { UserService } from './../shared/services/user.service';
import { AlertService } from './../shared/services/alert.service';
// pipes
import { SummaryPipe } from './../shared/pipes/summary.pipe';
// components
import { PublicComponent } from './public.component';
import { AlertComponent } from './components/alert/alert.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RatingComponent } from './components/rating/rating.component';
import { RegisterComponent } from './components/register/register.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { HomeComponent } from './components/home/home.component';
import { TagComponent } from './components/tag/tag.component';
import { GenderComponent } from './components/gender/gender.component';

// guard
import { NotorderGuard } from './../shared/services/notorder.guard';
import { NotauthGuard } from './../shared/services/notauth.guard';
import { AuthGuard } from './../shared/services/auth.guard';
import { SliderComponent } from './components/slider/slider.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DiffirentProductComponent } from './components/diffirent-product/diffirent-product.component';
import { FunctionComponent } from './components/function/function.component';
import { CartComponent } from './components/cart/cart.component';
const publicRoutes: Routes = [
	{ path: '', component: PublicComponent, children:[
		{path: '', component: HomeComponent, pathMatch: 'full'},
		{path: 'danh-muc/:slug', component: CategoryComponent},
		{path: 'nha-san-xuat/:slug', component: BrandComponent},
		{path: 'tag/:tag', component: TagComponent},
		{path: 'gioi-tinh/:gender', component: GenderComponent},
		{path: 'san-pham/:slug', component: ProductDetailComponent},
		{path: 'order', component: OrderComponent, canActivate:[NotorderGuard, NotauthGuard]},
		{path: 'don-hang-cua-toi', component: MyOrderComponent},
		{path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
		{path: 'thong-tin', component: InfoUserComponent, canActivate:[NotauthGuard]},
		{path: 'quen-mat-khau', component: ForgotPasswordComponent, canActivate:[AuthGuard]}
	]},]
@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		ModalModule.forRoot(),
		RouterModule.forChild(publicRoutes),
		BrowserAnimationsModule
	],
	declarations: [
		PublicComponent,
		AlertComponent,
		BrandComponent,
		CategoryComponent,
		FooterComponent,
		ForgotPasswordComponent,
		InfoUserComponent,
		MyOrderComponent,
		NavbarComponent,
		OrderComponent,
		OrderInfoComponent,
		OrderItemComponent,
		ProductDetailComponent,
		RatingComponent,
		RegisterComponent,
		RelatedProductComponent,
		SummaryPipe,
		SliderComponent,
		HomeComponent,
		MenuComponent,
		BreadcrumbComponent,
		DiffirentProductComponent,
		FunctionComponent,
		TagComponent,
		GenderComponent,
		CartComponent
	],
	providers: [
		CategoryService,
		ProductService,
		UserService,
		CartService,
		BrandService,
		AuthorService,
		AlertService,
		OrderService,
		NotorderGuard,
		NotauthGuard,
		AuthGuard
	]
})
export class PublicModule { }
