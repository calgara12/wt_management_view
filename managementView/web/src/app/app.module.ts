import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { TablesModule } from './tables.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';
import { UsersModule } from './users.module';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    UsersComponent,
    LoginComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    TablesModule,
    UsersModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
