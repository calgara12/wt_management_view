import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { Category } from '../categories/category';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  
  readonly api = 'http://localhost:3001/api'
  menuItems: MenuItem[]
  categories: Category[]
  menuItemId: number
  title: string
  description: string
  price: number
  category_ids: number[]
  allergens: string[]

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { 
    this.menuItems = []
    this.categories = []
    this.menuItemId = -1
    this.title = ""
    this.description = ""
    this.price = 0
    this.category_ids = []
    this.allergens = []
   }
    

  ngOnInit(): void {
    this.http.get<MenuItem[]>(this.api + '/menuItems',{headers: {"authorization": this.cookie.get("token")}})
    .subscribe(Response => {
      this.menuItems = Response;

      this.http.get<Category[]>(this.api + '/categories',{headers: {"authorization": this.cookie.get("token")}})
      .subscribe(Response =>{
        this.categories = Response;
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/')
        }
        console.log(error)
      });
    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
  }

  onEdit(selectedMenuItem: MenuItem) {
    this.menuItemId = selectedMenuItem.id;
    this.title = selectedMenuItem.title;
    this.description = selectedMenuItem.description;
    this.price = selectedMenuItem.price;
    this.category_ids = selectedMenuItem.category_ids;
    this.allergens = selectedMenuItem.allergens;
  }

  onDelete(selectedMenuItem:MenuItem) {
    this.http.delete(this.api + '/menuItems/' + selectedMenuItem.id,{headers: {"authorization": this.cookie.get("token")}}).subscribe((result) => {
      console.log(result);
    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
    location.reload();
  }

  onSubmit(menuItem: any) {
    let dto = {title: menuItem.title, desc: menuItem.description, price: menuItem.price, categoryId: menuItem.category_ids,
      allergens: menuItem.allergens};

    if(menuItem.menuItemId != -1) { //=-1 if already exists, update
      this.http.put(this.api + '/menuItems/' + menuItem.menuItemId, JSON.stringify(dto), {headers: {"Content-Type": "application/json","authorization": this.cookie.get("token")}})
      .subscribe((result) => {
        console.log(result);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/')
        }
        console.log(error)
      });
    } else {  //if item does not exist, post
      this.http.post(this.api + '/menuItems/create', JSON.stringify(dto), {headers: {"Content-Type": "application/json","authorization": this.cookie.get("token")}})
      .subscribe((result)=> {
        console.log(result);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/')
        }
        console.log(error)
      });
    }
    location.reload();
  }

}
