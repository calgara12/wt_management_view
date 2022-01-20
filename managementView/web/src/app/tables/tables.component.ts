import { HttpClient } from '@angular/common/http';
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
    this.http.get(this.api + '/tables')
    .subscribe(res => {
      console.log(res)
    })
  }

}
