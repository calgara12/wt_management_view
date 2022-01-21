import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Table } from './table'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  readonly api = 'http://localhost:3001/api'
  tables: Table[] = []
  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.http.get<Table[]>(this.api + '/tables')
    .subscribe(Response => {
 
      // If response comes hideloader() function is called
      // to hide that loader

      this.tables = Response
    });
  }

  onSubmit(table:Table){

    let obj = {
      test: "test",
      asdf: "asdf"
    }
    console.log(this.api+'/tables/create')
    const req = this.http.post(this.api+'/tables/create',JSON.stringify(table),{headers: {"Content-Type": "application/json"}}).subscribe((result)=> {
      console.log(result);
    })
    location.reload();

    console.log(table)
  }

}
