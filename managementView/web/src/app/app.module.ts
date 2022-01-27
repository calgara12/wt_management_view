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
import { FormsModule } from '@angular/forms';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuItemsModule } from './menuItems.module';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    LoginComponent,
    CategoriesComponent,
    MenuItemsComponent,
  ],
  imports: [
    BrowserModule,
    TablesModule,
    LoginModule,
    CategoriesModule,
    MenuItemsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
