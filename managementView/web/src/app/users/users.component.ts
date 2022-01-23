import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { Role } from './role'
import { Observable } from 'rxjs';


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
  constructor(private http: HttpClient) { 
    this.users = []
    this.roles = []
    this.id = -1
    this.role_id = -1
    this.role = ""
    this.username = ""
    this.password = ""
    this.selectedRole = {id:1, name:"management"}
  }

  ngOnInit(): void {
    this.http.get<User[]>(this.api + '/users')
    .subscribe(Response => {
      this.users = Response

      this.http.get<Role[]>(this.api + '/users/roles')
      .subscribe(Response => {
      this.roles = Response
      
        for (let user of this.users) {
          user.role = this.getRoleNameByID(user.role_id);
        }

      });

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
      this.http.put(this.api+'/users/' + user.id,JSON.stringify(dto),{headers: {"Content-Type": "application/json"}}).subscribe((result)=> {
        console.log(result);
      })
    }
    else{
      this.http.post(this.api+'/users/create',JSON.stringify(dto),{headers: {"Content-Type": "application/json"}}).subscribe((result)=> {
        console.log(result);
      })
    }

    location.reload();
  }

  onDelete(user:User){

    this.http.delete(this.api+'/users/' + user.id).subscribe((result)=> {
      console.log(result);
    })
    

    location.reload();
  }
}