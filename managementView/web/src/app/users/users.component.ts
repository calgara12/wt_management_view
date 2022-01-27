import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { Role } from './role'
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  readonly api = 'http://localhost:3001/api'
  users: User[]
  roles: Role[]
  selectedRole: Role
  id: number
  role_id: number
  role: string
  username: string 
  password: string
  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { 
    this.users = []
    this.roles = []
    this.id = -1
    this.role_id = -1
    this.role = ""
    this.username = ""
    this.password = ""
    this.selectedRole = {id:3, name:"kitchen"}
  }

  ngOnInit(): void {
    this.http.get<User[]>(this.api + '/users', {headers: {"authorization": this.cookie.get("token")}})
    .subscribe(Response => {
      this.users = Response

      this.http.get<Role[]>(this.api + '/users/roles',{headers: {"authorization": this.cookie.get("token")}})
      .subscribe(Response => {
      this.roles = Response
      
        for (let user of this.users) {
          user.role = this.getRoleNameByID(user.role_id);
        }
      },error => {
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

  getRoleNameByID(role_id:number):string {
    for(let role of this.roles){
      if(role.id === role_id){
        return role.name;
      }
    }
    return "unknown role"
  }

  onEdit(selectedUser: User) {
    this.id = selectedUser.id
    this.role_id = selectedUser.role_id
    this.username = selectedUser.username
    this.password = selectedUser.password
    this.selectedRole = this.roles.find(role => role.id === selectedUser.role_id)!
  }

  onSubmit(user:any){

    let dto = {role_id: user.roleSelect.id, username: user.username, password: user.password}
    if(user.id != -1){
      this.http.put(this.api+'/users/' + user.id,JSON.stringify(dto),{headers: {"Content-Type": "application/json", "authorization": this.cookie.get("token")}}).subscribe((result)=> {
        console.log(result);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/')
        }
        console.log(error)
      });
    }
    else{
      this.http.post(this.api+'/users/create',JSON.stringify(dto),{headers: {"Content-Type": "application/json", "authorization": this.cookie.get("token")}}).subscribe((result)=> {
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

  onDelete(user:User){

    this.http.delete(this.api+'/users/' + user.id,{headers: {"authorization": this.cookie.get("token")}}).subscribe((result)=> {
      console.log(result);
      location.reload();

    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
    

  }
}