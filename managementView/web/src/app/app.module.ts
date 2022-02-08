import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { TablesModule } from './tables.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories/categories.component'
import { CategoriesModule } from './categories.module';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuItemsModule } from './menuItems.module';
import { FormsModule }   from '@angular/forms';
import { UsersModule } from './users.module';
import { UsersComponent } from './users/users.component';
import {CookieService} from 'ngx-cookie-service'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    UsersComponent,
    LoginComponent,
    CategoriesComponent,
    MenuItemsComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    TablesModule,
    UsersModule,
    LoginModule,
    CategoriesModule,
    MenuItemsModule,
    HttpClientModule,
    FormsModule,
    UsersModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
