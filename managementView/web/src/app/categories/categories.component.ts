import { Component, OnInit } from '@angular/core';
import { Category } from './category'
import { Type } from './type'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  readonly api = 'http://localhost:3001/api'
  categories: Category[]
  types: Type[]
  id: number
  categoryName: string
  type_id: number
  typeName: string
  selectedType: Type

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { 
    this.categories = []
    this.types = []
    this.id = -1
    this.type_id = -1
    this.categoryName = ""
    this.typeName = ""
    this.selectedType = {id:1, name:"food"}
  }

  ngOnInit(): void {
    this.http.get<Category[]>(this.api + '/categories',{headers: {"authorization": this.cookie.get("token")}})
    .subscribe(Response => {
      this.categories = Response;

      this.http.get<Type[]>(this.api + '/categories/type',{headers: {"authorization": this.cookie.get("token")}})
      .subscribe(Response => {
        this.types = Response

        for (let category of this.categories) {
          category.typeName = this.getTypeNameByID(category.type_id);
        }
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

  getTypeNameByID(type_id: number):string {
      for(let type of this.types) {
        if(type.id === type_id) {
          return type.name;
        }
      }
      return "unkown type"
    }
    
  

  onEdit(selectedCategory: Category) {
    this.id = selectedCategory.id;
    this.type_id = selectedCategory.type_id;
    this.categoryName = selectedCategory.name;
    this.typeName = selectedCategory.typeName;
    this.selectedType = this.types.find(type => type.id === selectedCategory.type_id)!
  }

  onDelete(category: Category) {
    this.http.delete(this.api + '/categories/' + category.id,{headers: {"authorization": this.cookie.get("token")}}).subscribe((result) => {
      console.log(result);
    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
    location.reload();
  }

  onSubmit(category:any) {
    let dto = {name: category.categoryName, type_id: category.typeSelect.id}
    if(category.id != -1) {
      console.log(category.typeSelect.id);
      console.log(category.categoryName);
      this.http.put(this.api + '/categories/' + category.id, JSON.stringify(dto) , {headers: {"Content-Type": "application/json","authorization": this.cookie.get("token")}})
      .subscribe((result)=> {
        console.log(result);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/')
        }
        console.log(error)
      });
    }else {
      this.http.post(this.api + '/categories/create', JSON.stringify(dto), {headers: {"Content-Type": "application/json","authorization": this.cookie.get("token")}})
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

  