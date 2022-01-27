import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { Category } from '../categories/category';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient) {
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
    this.http.get<MenuItem[]>(this.api + '/menuItems')
    .subscribe(Response => {
      this.menuItems = Response;

      this.http.get<Category[]>(this.api + '/categories')
      .subscribe(Response =>{
        this.categories = Response;
      })
    })
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
    this.http.delete(this.api + '/menuItems/' + selectedMenuItem.id).subscribe((result) => {
      console.log(result);
    });
    location.reload();
  }

  onSubmit(menuItem: any) {
    let dto = {title: menuItem.title, desc: menuItem.description, price: menuItem.price, categoryId: menuItem.category_ids,
      allergens: menuItem.allergens};

    if(menuItem.menuItemId != -1) { //=-1 if already exists, update
      this.http.put(this.api + '/menuItems/' + menuItem.menuItemId, JSON.stringify(dto), {headers: {"Content-Type": "application/json"}})
      .subscribe((result) => {
        console.log(result);
      })
    } else {  //if item does not exist, post
      this.http.post(this.api + '/menuItems/create', JSON.stringify(dto), {headers: {"Content-Type": "application/json"}})
      .subscribe((result)=> {
        console.log(result);
      })
    }
    location.reload();
  }

}
