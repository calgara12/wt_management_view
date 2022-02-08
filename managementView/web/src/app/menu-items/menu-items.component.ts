import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { Category } from '../categories/category';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  allergensDropDownList: {item_id:number, item_text:string}[]
  dropdownSettings: IDropdownSettings = {}
  selectedAllergens: {item_id:number, item_text:string}[]
  categoriesDropDownList: {item_id:number, item_text:string}[]
  selectedCategories: {item_id:number, item_text:string}[]

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { 
    this.menuItems = []
    this.categories = []
    this.menuItemId = -1
    this.title = ""
    this.description = ""
    this.price = 0
    this.category_ids = []
    this.allergens = []
    this.selectedAllergens = []
    this.allergensDropDownList = [
      {item_id:1, item_text: 'A'},
      {item_id:2, item_text: 'B'},
      {item_id:3, item_text: 'C'},
      {item_id:4, item_text: 'D'},
      {item_id:5, item_text: 'E'},
      {item_id:6, item_text: 'F'},
      {item_id:7, item_text: 'G'},
      {item_id:8, item_text: 'H'},
      {item_id:9, item_text: 'L'},
      {item_id:10, item_text: 'M'},
      {item_id:11, item_text: 'N'},
      {item_id:12, item_text: 'O'},
      {item_id:13, item_text: 'P'},
      {item_id:14, item_text: 'R'}]
    this.selectedCategories = []
    this.categoriesDropDownList = []
   }
    

  ngOnInit(): void {
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true
    };
    this.http.get<MenuItem[]>(this.api + '/menuItems',{headers: {"authorization": this.cookie.get("token")}})
    .subscribe(Response => {
      this.menuItems = Response;
      console.log(this.menuItems)
      this.http.get<Category[]>(this.api + '/categories',{headers: {"authorization": this.cookie.get("token")}})
      .subscribe(Response =>{
        this.categories = Response;
        
        
        this.categories.forEach(element => {
          this.categoriesDropDownList = this.categoriesDropDownList.concat({item_id: element.id, item_text: element.name});
        })
        

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
    console.log(this.category_ids)
    
    this.selectedAllergens = [];
    for (let index = 0; index < selectedMenuItem.allergens.length; index++) {
      const allergen = selectedMenuItem.allergens[index];
      this.allergensDropDownList.forEach((element:{item_id:number, item_text:string}) => {
        if(allergen === element.item_text) {
          this.selectedAllergens.push(element);
        }
      })
    }
    
    this.selectedCategories = [];
    for (let index = 0; index < selectedMenuItem.category_ids.length; index++) {
      const category_id = selectedMenuItem.category_ids[index];
      this.categoriesDropDownList.forEach((element:{item_id:number, item_text:string}) => {
        if(element.item_id === category_id) {
          this.selectedCategories.push(element);
        }
      })
    }
    
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

  onSubmit(menuItem:any) {
    for (let index = 0; index < this.selectedAllergens.length/2; index++) {
      if(!menuItem.allergens.includes(this.selectedAllergens[index].item_text)) {
        menuItem.allergens.push(this.selectedAllergens[index].item_text);
      }
    }
    console.log(menuItem.allergens);
    menuItem.allergens.splice(0, menuItem.allergens.length/2);
    console.log(menuItem.allergens);
    this.selectedAllergens = []
    console.log(menuItem.category_ids);
    for (let index = 0; index < this.selectedCategories.length/2; index++) {
      if(!menuItem.category_ids.includes(this.selectedCategories[index].item_id)) {
        menuItem.category_ids.push(this.selectedCategories[index].item_id);
      }
    }
    console.log(menuItem.category_ids);
    menuItem.category_ids.splice(0, menuItem.category_ids.length/2);
    console.log(menuItem.category_ids);
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

  onItemSelect(item: any) {
    console.log(this.selectedCategories)
  }

  onSelectAll(item: any) {

  }

}
