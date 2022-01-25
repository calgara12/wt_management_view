import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  
  constructor(private http: HttpClient) {
    this.username = ""
    this.password = ""
  }


  ngOnInit(): void {

  }
  onSubmit(credentials:any){
    console.log(credentials)
  }

}
