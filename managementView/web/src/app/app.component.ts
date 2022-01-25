import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'managementView';
  constructor(private cookie: CookieService, private router: Router) {
  }
  onSignout(){
    this.cookie.delete("token")
    this.router.navigateByUrl('/')

  }
}




