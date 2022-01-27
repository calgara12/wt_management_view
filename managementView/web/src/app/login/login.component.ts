import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'
import { Response } from './response'
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly api = 'http://localhost:3001/api'

  username: string
  password: string
  invalid_credentials: boolean
  
  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) {
    this.username = ""
    this.password = ""
    this.invalid_credentials = false
  }


  ngOnInit(): void {

  }
  onSubmit(credentials:any){
    let dto= {
      user: credentials.username,
      pass: credentials.password
    }
    this.http.post<Response>(this.api+'/login',JSON.stringify(dto),{headers: {"Content-Type": "application/json"}},).subscribe((result)=> {
      console.log(result)
      this.cookie.set("token", result.token)
      this.router.navigateByUrl('/tables')

    }, error =>{
      if(error.status === 400){
        this.invalid_credentials = true
      }
    })
  }

}
