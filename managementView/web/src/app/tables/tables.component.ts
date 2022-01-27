import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Table } from './table'
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';




@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  readonly api = 'http://localhost:3001/api'
  tables: Table[]
  id: number
  location: string 
  seats: number
  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { 
    this.tables = []
    this.id = -1
    this.location = ""
    this.seats = 0
  }

  ngOnInit(): void {
    this.http.get<Table[]>(this.api + '/tables',{headers: {"authorization": this.cookie.get("token")}})
    .subscribe(Response => {
      this.tables = Response
    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
  }


  onEdit(selectedTable: Table) {
    this.id = selectedTable.id
    this.location = selectedTable.location
    this.seats = selectedTable.seats
  }

  onSubmit(table:Table){

    if(table.id != -1){
      this.http.put(this.api+'/tables/' + table.id,JSON.stringify(table),{headers: {"Content-Type": "application/json","authorization": this.cookie.get("token") }}).subscribe((result)=> {
        console.log(result);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/')
        }
        console.log(error)
      });
    }
    else{
      this.http.post(this.api+'/tables/create',JSON.stringify(table),{headers: {"Content-Type": "application/json", "authorization": this.cookie.get("token")}}).subscribe((result)=> {
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

  onDelete(table:Table){

    this.http.delete(this.api+'/tables/' + table.id, {headers: {"authorization": this.cookie.get("token")}}).subscribe((result)=> {
      console.log(result);
    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
    

    location.reload();
  }
  onPrintQRCode(table:Table){

    this.http.get(this.api+'/tables/' + table.id + '/qrcode',{headers: {"authorization": this.cookie.get("token")}}).subscribe((result)=> {
      console.log(result);
      let printWindow = window.open('qrcode', 'QRCode', 'location=1,status=1,scrollbars=1,width=800,height=600');

      printWindow!.document.write("<div style='width:100%;'>");
      printWindow!.document.write("<img id='img' src='" + result.toString() + "'/>");
      printWindow!.document.write("</div>");
      printWindow!.document.close();
      setTimeout(function() {
        printWindow!.focus();
        printWindow!.print();
        printWindow!.close();
    }, 250);
    }, error => {
      if(error.status === 401){
        this.router.navigateByUrl('/')
      }
      console.log(error)
    });
    

  }

}
