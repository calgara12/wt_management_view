import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MenuItemsComponent } from './menu-items/menu-items.component';

const routes: Routes = [
  {path: 'menuItems', component: MenuItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MenuItemsModule { }