import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //api
  private url:string = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  //select all
  select():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  create(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }

  edit(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url,obj);
  }

  remove(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
